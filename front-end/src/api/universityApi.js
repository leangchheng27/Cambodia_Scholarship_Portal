import API from '../services/api';

export async function getUniversities() {
  const response = await API.get('/universities');
  return response.data;
}

export async function getUniversityById(id) {
  const response = await API.get(`/universities/${id}`);
  return response.data;
}
