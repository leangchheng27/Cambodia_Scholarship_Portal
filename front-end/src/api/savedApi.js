import API from '../services/api';

// get all saved items
export async function getSavedItems() {
  const response = await API.get('/saved');
  return response.data;
}

// save an item
export async function saveItem(item) {
  const response = await API.post('/saved', item);
  return response.data;
}

// remove a saved item
export async function unsaveItem(itemId) {
  const response = await API.delete(`/saved/${itemId}`);
  return response.data;
}

// check if item is saved
export async function checkSavedItem(itemId) {
  const response = await API.get(`/saved/${itemId}`);
  return response.data;
}