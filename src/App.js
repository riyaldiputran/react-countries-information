import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const App = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [popupData, setPopupData] = useState(null);

  const showPopup = (country) => {
    setPopupData(country);
  };

  const closePopup = () => {
    setPopupData(null);
  };

  const searchCountries = async (countryName) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
      const data = response.data;
      setCountriesData(data);
    } catch (error) {
      console.log('ERROR', error);
      setCountriesData([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const countryName = e.target.elements.searchInput.value;
    searchCountries(countryName);
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <h1 className="mb-5 text-center fs-md-2">Search Countries Application</h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-9 col-lg-6">
          <form onSubmit={handleSearch} id="inputSearch">
            <input
              type="text"
              id="searchInput"
              className="form-control"
              placeholder="Search Country Data"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
          </form>
        </div>
      </div>
      <div id="countryCards" className="row justify-content-center">
        {countriesData.map((country, index) => (
          <div
            key={index}
            className="country-card border col-lg-3 p-3 col-md-4 col-sm-6 m-2 text-center"
            onClick={() => showPopup(country)}
          >
            <img className="img-fluid border" src={country.flags.png} alt={`${country.name.common} flag`} />
            <h2>{country.name.common}</h2>
            <h6>Capital: {country.capital}</h6>
            <h6>Currency: {country.currencies ? Object.values(country.currencies).map((currency) => currency.name).join(', ') : 'N/A'}</h6>
          </div>
        ))}
      </div>
      {popupData && (
        <div className="popup-container">
          <div className="popup-content">
            <div className="popup-title">{popupData.name.common}</div>
            <div className="popup-languages">
              Languages: {popupData.languages ? Object.values(popupData.languages).join(', ') : 'N/A'}
            </div>
            <div className="popup-continent">Continent: {popupData.region || 'N/A'}</div>
            <button className="btn btn-primary" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

