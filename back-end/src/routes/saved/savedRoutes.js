import express from 'express';
import { authenticateToken } from '../../middlewares/auth/authToken.js';
import Saved from '../../models/saved/saved.js';

const router = express.Router();

// GET /saved — get all saved items for current user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const items = await Saved.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch saved items' });
  }
});

// POST /saved — save an item
router.post('/', authenticateToken, async (req, res) => {
  const { itemId, itemType, title, description, image, detailPath } = req.body;
  try {
    const [item, created] = await Saved.findOrCreate({
      where: { userId: req.user.id, itemId, itemType },
      defaults: { title, description, image, detailPath },
    });
    res.json({ saved: true, item });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save item' });
  }
});

// DELETE /saved/:itemId — remove a saved item
router.delete('/:itemId', authenticateToken, async (req, res) => {
  try {
    await Saved.destroy({
      where: { userId: req.user.id, itemId: req.params.itemId },
    });
    res.json({ saved: false });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove saved item' });
  }
});

export default router;