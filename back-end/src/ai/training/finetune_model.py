"""
finetune_model.py
=================
Fine-tunes the sentence-transformer model on your collected scholarship feedback data.

This is how the AI "learns" from real student behaviour — the model's weights are
updated so that scholarship descriptions which students actually engage with become
more similar (in embedding space) to the student profiles that engaged with them.

Prerequisites
-------------
    pip install sentence-transformers torch

Usage
-----
    # 1. Export training data from the database
    cd back-end
    node scripts/generateTrainingData.js

    # 2. Run the fine-tune script
    python scripts/finetune_model.py

    # 3. The fine-tuned model is saved to back-end/scripts/fine_tuned_model/
    #    Upload it to Hugging Face Hub and update HUGGINGFACE_API_KEY in .env

Minimum training data
---------------------
You need at least 50 labelled pairs before fine-tuning is worthwhile.
With fewer pairs the model tends to overfit.
Run the app, let users interact, then export and fine-tune periodically.
"""

import json
import os
import math
from pathlib import Path

# ── imports (install with: pip install sentence-transformers torch) ──────────
try:
    from sentence_transformers import SentenceTransformer, InputExample, losses
    from torch.utils.data import DataLoader
    import torch
except ImportError:
    print("ERROR: Required packages not installed.")
    print("Run:  pip install sentence-transformers torch")
    raise

# ── configuration ────────────────────────────────────────────────────────────

BASE_MODEL   = "sentence-transformers/all-MiniLM-L6-v2"   # starting checkpoint
TRAIN_FILE   = Path(__file__).parent / "training_data.json"
OUTPUT_DIR   = Path(__file__).parent / "fine_tuned_model"

BATCH_SIZE   = 16
NUM_EPOCHS   = 4
WARMUP_STEPS = 100    # linear LR warmup

# ── load training data ────────────────────────────────────────────────────────

print(f"\n📂 Loading training data from {TRAIN_FILE}")

if not TRAIN_FILE.exists():
    print("ERROR: training_data.json not found.")
    print("Run:  node scripts/generateTrainingData.js   first.")
    raise FileNotFoundError(str(TRAIN_FILE))

with open(TRAIN_FILE, "r", encoding="utf-8") as f:
    bundle = json.load(f)

train_raw = bundle.get("train_data", [])
val_raw   = bundle.get("val_data",   [])
print(f"   Train pairs : {len(train_raw)}")
print(f"   Val   pairs : {len(val_raw)}")
print(f"   Label dist  : {bundle.get('label_distribution', {})}")

if len(train_raw) < 10:
    print("\nWARNING: Very few training examples. Collect more user feedback first.")

# ── build InputExample objects ────────────────────────────────────────────────
#
#  Each example has:
#    texts  = [student_profile_text, scholarship_text]
#    label  = cosine-similarity target (0.0 = should be far, 1.0 = should be close)
#
#  CosineSimilarityLoss will push the embeddings of positive pairs together
#  and pull negative pairs apart.

def make_examples(rows):
    return [
        InputExample(texts=[r["sentence1"], r["sentence2"]], label=float(r["label"]))
        for r in rows
        if r.get("sentence1") and r.get("sentence2")
    ]

train_examples = make_examples(train_raw)
val_examples   = make_examples(val_raw)

train_loader = DataLoader(train_examples, shuffle=True, batch_size=BATCH_SIZE)

# ── load base model ───────────────────────────────────────────────────────────

print(f"\n🤖 Loading base model: {BASE_MODEL}")
model = SentenceTransformer(BASE_MODEL)

# ── define loss function ──────────────────────────────────────────────────────
#
#  CosineSimilarityLoss: given a pair (a, b) with label L,
#  it minimises  MSE( cosine_sim(embed(a), embed(b)), L )
#
#  This is the simplest approach. For larger datasets consider
#  MultipleNegativesRankingLoss or TripletLoss.

loss = losses.CosineSimilarityLoss(model)

# ── training ──────────────────────────────────────────────────────────────────

total_steps = len(train_loader) * NUM_EPOCHS

print(f"\n🚀 Starting fine-tuning")
print(f"   Epochs        : {NUM_EPOCHS}")
print(f"   Batch size    : {BATCH_SIZE}")
print(f"   Total steps   : {total_steps}")
print(f"   Warmup steps  : {WARMUP_STEPS}")
print(f"   Output dir    : {OUTPUT_DIR}\n")

model.fit(
    train_objectives=[(train_loader, loss)],
    epochs=NUM_EPOCHS,
    warmup_steps=WARMUP_STEPS,
    output_path=str(OUTPUT_DIR),
    show_progress_bar=True,
)

# ── quick validation ──────────────────────────────────────────────────────────

if val_examples:
    print("\n📊 Validation check (sample of 5 pairs):")
    for ex in val_examples[:5]:
        emb = model.encode(ex.texts, convert_to_tensor=True)
        from sentence_transformers.util import cos_sim
        predicted = cos_sim(emb[0], emb[1]).item()
        print(f"   target={ex.label:.1f}  predicted={predicted:.3f}  δ={abs(predicted - ex.label):.3f}")

# ── save & next steps ─────────────────────────────────────────────────────────

print(f"\n✅ Fine-tuned model saved to: {OUTPUT_DIR}")
print("""
Next steps
----------
1. Upload the fine-tuned model to Hugging Face Hub:
       huggingface-cli login
       python -c "
       from sentence_transformers import SentenceTransformer
       m = SentenceTransformer('scripts/fine_tuned_model')
       m.push_to_hub('your-hf-username/csp-scholarship-matcher')
       "

2. Update back-end/.env:
       HUGGINGFACE_API_KEY=hf_...
       # And optionally add a custom model env var:
       # HF_MODEL=your-hf-username/csp-scholarship-matcher

3. Update back-end/src/config/ai/constants.js:
       EMBEDDING_MODEL: process.env.HF_MODEL || 'sentence-transformers/all-MiniLM-L6-v2'

4. Restart the backend — it will now use your fine-tuned model.

Re-train periodically (e.g. weekly) as more user feedback accumulates.
""")
