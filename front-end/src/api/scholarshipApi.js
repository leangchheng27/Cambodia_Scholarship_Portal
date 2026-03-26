import API from '../services/api';

export async function getScholarships(search = '', type = '') {
  const response = await API.get('/scholarships', {
    params: { search, type }
  });
  return response.data;
}

export async function getScholarshipById(id) {
  const response = await API.get(`/scholarships/${id}`);
  return response.data;
}
