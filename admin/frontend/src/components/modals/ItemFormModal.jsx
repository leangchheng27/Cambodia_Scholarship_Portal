import { getInitialFormState } from '../common/FormUtils.js';
import './ItemFormModal.css';

const ItemFormModal = ({ 
    isOpen, 
    onClose, 
    modalType, 
    activeTab, 
    currentItem, 
    formState, 
    onFieldChange, 
    onSubmit 
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{modalType === 'create' ? 'Add' : 'Edit'} {activeTab.slice(0, -1)}</h2>
                <form onSubmit={onSubmit}>
                    {/* Users Form */}
                    {activeTab === 'users' && (
                        <>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formState.name || ''}
                                onChange={onFieldChange}
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formState.email || ''}
                                onChange={onFieldChange}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder={currentItem ? 'New password (leave blank to keep)' : 'Password'}
                                value={formState.password || ''}
                                onChange={onFieldChange}
                                {...(!currentItem ? { required: true } : {})}
                            />
                            <select name="role" value={formState.role || 'user'} onChange={onFieldChange}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', fontSize: '14px' }}>
                                <input
                                    type="checkbox"
                                    name="isVerified"
                                    checked={Boolean(formState.isVerified)}
                                    onChange={onFieldChange}
                                />
                                Email Verified
                            </label>
                        </>
                    )}

                    {/* Universities Form */}
                    {activeTab === 'universities' && (
                        <>
                            <input type="text" name="name" placeholder="University Name" value={formState.name || ''} onChange={onFieldChange} required />
                            <textarea name="description" placeholder="Description" value={formState.description || ''} onChange={onFieldChange} rows="4" />
                            <select name="location" value={formState.location || ''} onChange={onFieldChange} required>
                                <option value="">-- Select Province --</option>
                                <option value="Phnom Penh">Phnom Penh</option>
                                <option value="Battambang">Battambang</option>
                                <option value="Banteay Meanchey">Banteay Meanchey</option>
                                <option value="Kampong Cham">Kampong Cham</option>
                                <option value="Kampong Chhnan">Kampong Chhnan</option>
                                <option value="Kampong Thom">Kampong Thom</option>
                                <option value="Kampot">Kampot</option>
                                <option value="Kandal">Kandal</option>
                                <option value="Kep">Kep</option>
                                <option value="Koh Kong">Koh Kong</option>
                                <option value="Kompong Speu">Kompong Speu</option>
                                <option value="Kratie">Kratie</option>
                                <option value="Mondulkiri">Mondulkiri</option>
                                <option value="Oddar Meanchey">Oddar Meanchey</option>
                                <option value="Pailin">Pailin</option>
                                <option value="Preah Vihear">Preah Vihear</option>
                                <option value="Prey Veng">Prey Veng</option>
                                <option value="Pursat">Pursat</option>
                                <option value="Ratanakiri">Ratanakiri</option>
                                <option value="Siem Reap">Siem Reap</option>
                                <option value="Sihanoukville">Sihanoukville</option>
                                <option value="Steung Treng">Steung Treng</option>
                                <option value="Svay Rieng">Svay Rieng</option>
                                <option value="Takeo">Takeo</option>
                                <option value="Tbong Khmum">Tbong Khmum</option>
                            </select>
                            <input type="url" name="original_link" placeholder="Original Link" value={formState.original_link || ''} onChange={onFieldChange} />
                            <input type="url" name="poster_image_url" placeholder="Poster Image URL" value={formState.poster_image_url || ''} onChange={onFieldChange} />
                            <input type="url" name="slider_image_url" placeholder="Slider Image URL" value={formState.slider_image_url || ''} onChange={onFieldChange} />
                            
                            {/* University Detail Information Section */}
                            <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '16px', marginTop: '16px' }}>
                                <label style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '600', display: 'block', marginBottom: '12px' }}>📚 University Information</label>
                                
                                <textarea name="general_information" placeholder="General Information" value={formState.general_information || ''} onChange={onFieldChange} rows="3" />
                                
                                <textarea name="majors" placeholder="Majors (one per line)" value={formState.majors || ''} onChange={onFieldChange} rows="3" />
                                
                                <textarea name="application_guide" placeholder="Application Guide" value={formState.application_guide || ''} onChange={onFieldChange} rows="3" />
                                
                                <textarea name="tuition_fees" placeholder="Tuition Fees Information" value={formState.tuition_fees || ''} onChange={onFieldChange} rows="3" />
                                
                                <textarea name="campus" placeholder="Campus Information" value={formState.campus || ''} onChange={onFieldChange} rows="3" />
                                
                                <textarea name="others" placeholder="Other Information" value={formState.others || ''} onChange={onFieldChange} rows="3" />
                            </div>
                        </>
                    )}

                    {/* Scholarships Form */}
                    {activeTab === 'scholarships' && (
                        <>
                            <input type="text" name="name" placeholder="Scholarship Name" value={formState.name || ''} onChange={onFieldChange} required />
                            <select name="type" value={formState.type || 'cambodia'} onChange={onFieldChange} required>
                                <option value="cambodia">Cambodia</option>
                                <option value="abroad">Abroad</option>
                            </select>
                            <textarea name="description" placeholder="Description" value={formState.description || ''} onChange={onFieldChange} rows="4" />
                            <input type="text" name="funded_by" placeholder="Funded By" value={formState.funded_by || ''} onChange={onFieldChange} />
                            <input type="text" name="course_duration" placeholder="Course Duration" value={formState.course_duration || ''} onChange={onFieldChange} />
                            <input type="url" name="original_link" placeholder="Original Link" value={formState.original_link || ''} onChange={onFieldChange} />
                            <input type="url" name="poster_image_url" placeholder="Poster Image URL" value={formState.poster_image_url || ''} onChange={onFieldChange} />
                            <input type="url" name="slider_image_url" placeholder="Slider Image URL" value={formState.slider_image_url || ''} onChange={onFieldChange} />
                            <textarea name="eligibility" placeholder="Eligibility (one item per line)" value={formState.eligibility || ''} onChange={onFieldChange} rows="4" />
                            <textarea name="applicable_programs" placeholder="Applicable Programs (one item per line)" value={formState.applicable_programs || ''} onChange={onFieldChange} rows="4" />
                            <textarea name="benefits" placeholder="Benefits (one item per line)" value={formState.benefits || ''} onChange={onFieldChange} rows="4" />
                            
                            {/* AI Metadata Section */}
                            <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '16px', marginTop: '16px' }}>
                                <label style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '600', display: 'block', marginBottom: '16px' }}>🤖 AI Metadata (for Recommendations)</label>
                                
                                <div>
                                    <label style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: '500', display: 'block', marginBottom: '6px' }}>Student Types</label>
                                    <select 
                                        name="ai_metadata_studentTypes" 
                                        value={formState.ai_metadata_studentTypes || ''} 
                                        onChange={onFieldChange}
                                        style={{ fontSize: '12px', marginBottom: '12px', width: '100%' }}
                                    >
                                        <option value="">-- Select Student Type --</option>
                                        <option value="science">Science</option>
                                        <option value="social science">Social Science</option>
                                        <option value="both">Both</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: '500', display: 'block', marginBottom: '6px' }}>Field Categories</label>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '12px' }}>
                                        {['Engineering', 'Medicine', 'Business', 'Law', 'Arts', 'Science', 'Technology', 'Agriculture', 'Education', 'Nursing', 'Psychology', 'Architecture', 'Finance', 'Computer Science', 'Social Sciences'].map((category) => {
                                            const categoriesArray = (formState.ai_metadata_fieldCategories || '').split(',').map(s => s.trim()).filter(s => s);
                                            const isChecked = categoriesArray.includes(category);
                                            return (
                                                <label key={category} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#cbd5e1', cursor: 'pointer' }}>
                                                    <input 
                                                        type="checkbox" 
                                                        checked={isChecked}
                                                        onChange={(e) => {
                                                            const current = (formState.ai_metadata_fieldCategories || '').split(',').map(s => s.trim()).filter(s => s);
                                                            let updated;
                                                            if (e.target.checked) {
                                                                updated = [...current, category];
                                                            } else {
                                                                updated = current.filter(c => c !== category);
                                                            }
                                                            onFieldChange({
                                                                target: {
                                                                    name: 'ai_metadata_fieldCategories',
                                                                    value: updated.join(', ')
                                                                }
                                                            });
                                                        }}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                    {category}
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                                
                                <div>
                                    <label style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: '500', display: 'block', marginBottom: '6px' }}>Required Subjects</label>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '12px' }}>
                                        {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography', 'Economics', 'Accounting', 'Literature', 'Computer Science', 'Statistics', 'Philosophy', 'Foreign Language', 'Psychology'].map((subject) => {
                                            const subjectsArray = (formState.ai_metadata_requiredSubjects || '').split(',').map(s => s.trim()).filter(s => s);
                                            const isChecked = subjectsArray.includes(subject);
                                            return (
                                                <label key={subject} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#cbd5e1', cursor: 'pointer' }}>
                                                    <input 
                                                        type="checkbox" 
                                                        checked={isChecked}
                                                        onChange={(e) => {
                                                            const current = (formState.ai_metadata_requiredSubjects || '').split(',').map(s => s.trim()).filter(s => s);
                                                            let updated;
                                                            if (e.target.checked) {
                                                                updated = [...current, subject];
                                                            } else {
                                                                updated = current.filter(s => s !== subject);
                                                            }
                                                            onFieldChange({
                                                                target: {
                                                                    name: 'ai_metadata_requiredSubjects',
                                                                    value: updated.join(', ')
                                                                }
                                                            });
                                                        }}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                    {subject}
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                                
                                <div>
                                    <label style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: '500', display: 'block', marginBottom: '6px' }}>Min GPA</label>
                                    <input 
                                        type="number" 
                                        name="ai_metadata_minGPA" 
                                        placeholder="e.g., 3.2" 
                                        step="0.1"
                                        min="0"
                                        max="4"
                                        value={formState.ai_metadata_minGPA || ''} 
                                        onChange={(e) => {
                                            let value = parseFloat(e.target.value);
                                            if (e.target.value === '' || isNaN(value)) {
                                                onFieldChange(e);
                                            } else if (value < 0) {
                                                onFieldChange({
                                                    target: { name: 'ai_metadata_minGPA', value: '0' }
                                                });
                                            } else if (value > 4) {
                                                onFieldChange({
                                                    target: { name: 'ai_metadata_minGPA', value: '4' }
                                                });
                                            } else {
                                                onFieldChange(e);
                                            }
                                        }}
                                        style={{ fontSize: '12px', marginBottom: '12px', width: '100%' }}
                                    />
                                    {formState.ai_metadata_minGPA && (parseFloat(formState.ai_metadata_minGPA) < 0 || parseFloat(formState.ai_metadata_minGPA) > 4) && (
                                        <span style={{ fontSize: '10px', color: '#f87171' }}>GPA must be between 0 and 4</span>
                                    )}
                                </div>
                                
                                <div>
                                    <label style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: '500', display: 'block', marginBottom: '6px' }}>Difficulty Level</label>
                                    <select name="ai_metadata_difficultyLevel" value={formState.ai_metadata_difficultyLevel || ''} onChange={onFieldChange} style={{ fontSize: '12px', marginBottom: '12px', width: '100%' }}>
                                        <option value="">-- Select Difficulty --</option>
                                        <option value="easy">Easy</option>
                                        <option value="moderate">Moderate</option>
                                        <option value="competitive">Competitive</option>
                                    </select>
                                </div>
                                
                                <div>
                                    <label style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: '500', display: 'block', marginBottom: '6px' }}>Keywords & Tags</label>
                                    <textarea 
                                        name="ai_metadata_keywords" 
                                        placeholder="engineering, design, innovation, construction&#10;(one item per line)" 
                                        value={formState.ai_metadata_keywords || ''} 
                                        onChange={onFieldChange} 
                                        rows="3"
                                        style={{ fontSize: '12px', width: '100%' }}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Internships Form */}
                    {activeTab === 'internships' && (
                        <>
                            <input type="text" name="name" placeholder="Internship Name" value={formState.name || ''} onChange={onFieldChange} required />
                            <textarea name="description" placeholder="Description" value={formState.description || ''} onChange={onFieldChange} rows="4" />
                            <input type="text" name="company" placeholder="Company" value={formState.company || ''} onChange={onFieldChange} />
                            <input type="text" name="duration" placeholder="Duration" value={formState.duration || ''} onChange={onFieldChange} />
                            <input type="url" name="original_link" placeholder="Original Link" value={formState.original_link || ''} onChange={onFieldChange} />
                            <input type="url" name="poster_image_url" placeholder="Poster Image URL" value={formState.poster_image_url || ''} onChange={onFieldChange} />
                            <input type="url" name="slider_image_url" placeholder="Slider Image URL" value={formState.slider_image_url || ''} onChange={onFieldChange} />
                            <textarea name="eligibility" placeholder="Eligibility (one item per line)" value={formState.eligibility || ''} onChange={onFieldChange} rows="4" />
                            <textarea name="applicable_programs" placeholder="Applicable Programs (one item per line)" value={formState.applicable_programs || ''} onChange={onFieldChange} rows="4" />
                            <textarea name="benefits" placeholder="Benefits (one item per line)" value={formState.benefits || ''} onChange={onFieldChange} rows="4" />
                            
                            {/* AI Metadata Section */}
                            <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '16px', marginTop: '16px' }}>
                                <label style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '600', display: 'block', marginBottom: '16px' }}>🤖 AI Metadata (for Recommendations)</label>
                                
                                <div>
                                    <label style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: '500', display: 'block', marginBottom: '6px' }}>Field Categories</label>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '12px' }}>
                                        {['Engineering', 'Medicine', 'Business', 'Law', 'Arts', 'Science', 'Technology', 'Agriculture', 'Education', 'Nursing', 'Psychology', 'Architecture', 'Finance', 'Computer Science', 'Social Sciences'].map((category) => {
                                            const categoriesArray = (formState.ai_metadata_fieldCategories || '').split(',').map(s => s.trim()).filter(s => s);
                                            const isChecked = categoriesArray.includes(category);
                                            return (
                                                <label key={category} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#cbd5e1', cursor: 'pointer' }}>
                                                    <input 
                                                        type="checkbox" 
                                                        checked={isChecked}
                                                        onChange={(e) => {
                                                            const current = (formState.ai_metadata_fieldCategories || '').split(',').map(s => s.trim()).filter(s => s);
                                                            let updated;
                                                            if (e.target.checked) {
                                                                updated = [...current, category];
                                                            } else {
                                                                updated = current.filter(c => c !== category);
                                                            }
                                                            onFieldChange({
                                                                target: {
                                                                    name: 'ai_metadata_fieldCategories',
                                                                    value: updated.join(', ')
                                                                }
                                                            });
                                                        }}
                                                        style={{ cursor: 'pointer' }}
                                                    />
                                                    {category}
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                                
                                <div>
                                    <label style={{ fontSize: '11px', color: '#cbd5e1', fontWeight: '500', display: 'block', marginBottom: '6px' }}>Keywords & Tags</label>
                                    <textarea 
                                        name="ai_metadata_keywords" 
                                        placeholder="technology, programming, software development&#10;(one item per line)" 
                                        value={formState.ai_metadata_keywords || ''} 
                                        onChange={onFieldChange} 
                                        rows="3"
                                        style={{ fontSize: '12px', width: '100%' }}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="admin-modal-cancel-btn">
                            Cancel
                        </button>
                        <button type="submit" className="admin-modal-submit-btn">
                            {modalType === 'create' ? 'Create' : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ItemFormModal;
