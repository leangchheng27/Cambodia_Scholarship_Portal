import API from '../services/api';

export async function getDashboardStats() {
  const response = await API.get('/admin/dashboard');
  return response.data;
}

export async function getUsers() {
  const response = await API.get('/admin/users');
  return response.data;
}

export async function getAdminUniversities() {
  const response = await API.get('/admin/universities');
  return response.data;
}

export async function getAdminScholarships() {
  const response = await API.get('/admin/scholarships');
  return response.data;
}

export async function getAdminInternships() {
  const response = await API.get('/admin/internships');
  return response.data;
}

export async function deleteUser(userId) {
  const response = await API.delete(`/admin/users/${userId}`);
  return response.data;
}

export async function deleteItem(type, id) {
  const response = await API.delete(`/admin/${type}/${id}`);
  return response.data;
}

export async function updateItem(type, id, data) {
  const response = await API.put(`/admin/${type}/${id}`, data);
  return response.data;
}

export async function createItem(type, data) {
  const response = await API.post(`/admin/${type}`, data);
  return response.data;
}

export async function getAIAnalytics() {
  const response = await API.get('/admin/ai-analytics');
  return response.data;
}
