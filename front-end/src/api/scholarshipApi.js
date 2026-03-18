import API from '../services/api';

export async function getScholarships() {
  const response = await API.get('/scholarships');
  return response.data;
}

export async function getScholarshipById(id) {
  const response = await API.get(`/scholarships/${id}`);
  return response.data;
}
