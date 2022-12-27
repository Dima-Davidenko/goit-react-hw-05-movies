import axios from 'axios';

const axiosTMDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '220d205b9d425bbb3fa953ef6e87c55b',
    include_adult: false,
  },
});

export const fetchPopular = async () => {
  const { data } = await axiosTMDB.get('trending/movie/week');
  return data;
};
export const fetchSearchByWord = async ({ queryKey }) => {
  const query = queryKey[0];
  if (!query) return null;
  const { data } = await axiosTMDB.get('search/movie', {
    params: { query },
  });
  return data;
};
export const fetchDetailsById = async ({ queryKey }) => {
  const id = queryKey[1];
  const { data } = await axiosTMDB.get(`/movie/${id}`);
  return data;
};
export const fetchCastById = async ({ queryKey }) => {
  const id = queryKey[1];
  const { data } = await axiosTMDB.get(`/movie/${id}/credits`);
  return data;
};
export const fetchReviewById = async ({ queryKey }) => {
  const id = queryKey[1];
  const { data } = await axiosTMDB.get(`/movie/${id}/reviews`);
  return data;
};
