import API from '../services/api';

export async function getInternships() {
  const response = await API.get('/internships');
  return response.data;
}

export async function getInternshipById(id) {
  const response = await API.get(`/internships/${id}`);
  return response.data;
}
