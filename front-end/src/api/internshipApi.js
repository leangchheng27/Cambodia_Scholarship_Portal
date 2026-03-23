import API from '../services/api';

export async function getInternships(search = '') {
  const response = await API.get('/internships', {
    params: { search }
  });
  return response.data;
}

export async function getInternshipById(id) {
  const response = await API.get(`/internships/${id}`);
  return response.data;
}
