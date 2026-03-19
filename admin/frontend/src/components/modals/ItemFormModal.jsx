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
                            <input type="text" name="location" placeholder="Location" value={formState.location || ''} onChange={onFieldChange} />
                            <input type="url" name="original_link" placeholder="Original Link" value={formState.original_link || ''} onChange={onFieldChange} />
                            <input type="url" name="poster_image_url" placeholder="Poster Image URL" value={formState.poster_image_url || ''} onChange={onFieldChange} />
                            <input type="url" name="slider_image_url" placeholder="Slider Image URL" value={formState.slider_image_url || ''} onChange={onFieldChange} />
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
