import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      const sortedCountries = response.data.sort((a, b) => a.population - b.population);
      setCountries(sortedCountries);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const getRegionColor = (region) => {
    switch(region) {
      case 'Africa': return 'blue';
      case 'Americas': return 'green';
      case 'Asia': return 'red';
      case 'Europe': return 'yellow';
      case 'Oceania': return 'purple';
      default: return 'gray';
    }
  };

  return (
    <div>
      <button onClick={fetchCountries}>Load Countries</button>
      <ul>
        {countries.map(country => (
          <li key={country.cca3} style={{ color: getRegionColor(country.region) }}>
            <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
            {country.name.common} - Has a population of {country.population} people
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
