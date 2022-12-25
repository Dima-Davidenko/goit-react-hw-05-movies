import axios from 'axios';

const axiosTMDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '220d205b9d425bbb3fa953ef6e87c55b',
    include_adult: false,
  },
});

export const fetchPopular = async (page = 1) => {
  const { data } = await axiosTMDB.get('trending/movie/week', {
    params: { page, language: 'en' },
  });
  return data;
};
export const fetchSearchByWord = async query => {
  const { data } = await axiosTMDB.get('search/movie', {
    params: { query, language: 'en' },
  });
  return data;
};
export const fetchDetailsById = async id => {
  const { data } = await axiosTMDB.get(`/movie/${id}`, {
    params: { language: 'en' },
  });
  return data;
};
export const fetchCastById = id => {
  return axiosTMDB.get(`/movie/${id}/credits`, {
    params: { language: 'en' },
  });
};
export const fetchReviewById = async id => {
  const { data } = await axiosTMDB.get(`/movie/${id}/reviews`, {
    params: { language: 'en' },
  });
  return data;
};
