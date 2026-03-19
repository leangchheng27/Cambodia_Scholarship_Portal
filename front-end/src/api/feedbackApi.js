import API from '../services/api';

/**
 * Record a user interaction with a scholarship.
 * Fire-and-forget — never throws, never blocks the UI.
 *
 * @param {object} params
 * @param {string|number} params.scholarshipId
 * @param {'scholarship'|'scholarship-cambodia'|'scholarship-abroad'|'internship'} [params.scholarshipType]
 * @param {'view'|'click'|'save'|'apply'|'dismiss'} params.action
 * @param {object} [params.scholarshipSnapshot]  - title, description, etc.
 */
export async function recordFeedback({ scholarshipId, scholarshipType = 'scholarship', action, scholarshipSnapshot = null }) {
  try {
    await API.post('/feedback', {
      scholarshipId: String(scholarshipId),
      scholarshipType,
      action,
      scholarshipSnapshot,
    });
  } catch (error) {
    // Keep fire-and-forget behavior, but expose failures in dev for debugging.
    if (import.meta.env.DEV) {
      console.warn('Feedback recording failed:', error?.response?.data || error?.message || error);
    }
  }
}
