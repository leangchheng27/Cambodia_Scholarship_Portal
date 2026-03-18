const STORAGE_PREFIX = 'csp_saved_items';
const SAVED_UPDATED_EVENT = 'csp:saved-updated';

const getStorageKey = (userId) => `${STORAGE_PREFIX}:${userId || 'guest'}`;

const safeParse = (raw) => {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const emitSavedUpdated = (userId, count) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(SAVED_UPDATED_EVENT, {
      detail: { userId: userId || 'guest', count },
    })
  );
};

export const buildSavedItemKey = (type, id) => `${type}:${id}`;

export const readSavedItems = (userId) => {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(getStorageKey(userId));
  return safeParse(raw);
};

export const writeSavedItems = (userId, items) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(getStorageKey(userId), JSON.stringify(items));
  emitSavedUpdated(userId, items.length);
};

export const isSavedItem = (key, userId) => {
  const items = readSavedItems(userId);
  return items.some((item) => item.key === key);
};

export const toggleSavedItem = (item, userId) => {
  const items = readSavedItems(userId);
  const existingIndex = items.findIndex((entry) => entry.key === item.key);

  if (existingIndex >= 0) {
    const nextItems = items.filter((entry) => entry.key !== item.key);
    writeSavedItems(userId, nextItems);
    return { saved: false, items: nextItems };
  }

  const nextItems = [{ ...item, savedAt: new Date().toISOString() }, ...items];
  writeSavedItems(userId, nextItems);
  return { saved: true, items: nextItems };
};

export const removeSavedItem = (key, userId) => {
  const nextItems = readSavedItems(userId).filter((item) => item.key !== key);
  writeSavedItems(userId, nextItems);
  return nextItems;
};

export const getSavedUpdatedEventName = () => SAVED_UPDATED_EVENT;
