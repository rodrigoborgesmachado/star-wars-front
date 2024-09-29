import React, { useState, useEffect } from 'react';
import { getToken, getStarships } from '../services/apiService';
import StarshipFilter from './StarshipFilter';

const StarshipList = () => {
  const [token, setToken] = useState(null);
  const [filteredStarships, setFilteredStarships] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState('');

  useEffect(() => {
    const fetchTokenAndStarships = async () => {
      try {
        const authToken = await getToken();
        setToken(authToken);

        const starshipData = await getStarships(authToken);
        setFilteredStarships(starshipData);

        const uniqueManufacturers = [...new Set(starshipData.map(starship => starship.manufacturer))];
        setManufacturers(uniqueManufacturers);
      } catch (error) {
        console.error('Error fetching token or starships:', error);
      }
    };

    fetchTokenAndStarships();
  }, []);

  const handleManufacturerChange = async (event) => {
    const selected = event.target.value;
    setSelectedManufacturer(selected);

    if (token) {
      const starshipData = await getStarships(token, selected);
      setFilteredStarships(starshipData);
    }
  };

  return (
    <div>
      <h1>Starships</h1>
      <StarshipFilter 
        manufacturers={manufacturers} 
        selectedManufacturer={selectedManufacturer} 
        onSelectManufacturer={handleManufacturerChange} 
      />
      <ul>
        {filteredStarships.map(starship => (
          <li key={starship.name}>{starship.name} - {starship.manufacturer}</li>
        ))}
      </ul>
    </div>
  );
};

export default StarshipList;
