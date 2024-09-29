import axios from 'axios';

const API_URL = window.location.href.includes("localhost") ? 'https://localhost:7029' : 'https://starwarsapi-e9evg0b8dhg8czbw.canadacentral-01.azurewebsites.net'; 

export const getToken = async () => {
  const response = await axios.post(`${API_URL}/Token`, {
    userName: 'teste',
    token: '12345'
  }, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  return response.data.access_token;
};

export const getStarships = async (token, manufacturer = '') => {
  const response = await axios.get(`${API_URL}/Starships`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      manufacturer,
    },
  });

  return response.data;
};
