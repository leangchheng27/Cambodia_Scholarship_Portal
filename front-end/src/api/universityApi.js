import API from '../services/api';

export async function getUniversities(search = '') {
  const response = await API.get('/universities', {
    params: { search }
  });
  return response.data;
}

export async function getUniversityById(id) {
  const response = await API.get(`/universities/${id}`);
  return response.data;
}
