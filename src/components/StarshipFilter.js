import React from 'react';

const StarshipFilter = ({ manufacturers, selectedManufacturer, onSelectManufacturer }) => {
  return (
    <select value={selectedManufacturer} onChange={onSelectManufacturer}>
      <option value="">All Manufacturers</option>
      {manufacturers.map((manufacturer) => (
        <option key={manufacturer} value={manufacturer}>
          {manufacturer}
        </option>
      ))}
    </select>
  );
};

export default StarshipFilter;
