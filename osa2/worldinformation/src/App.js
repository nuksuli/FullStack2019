import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'

const App = () => {
  const [infos, setInfos] = useState([])
  const [countries, setCountries] = useState('')
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setInfos(response.data)
      })
  }, [])

  const handleCountryChange = (event) => {
    setCountries(event.target.value)
  }
  const CountriesToShow = () => {
    const filteredCountries =
      countries === ''
        ? infos
        : infos.filter(info =>
          info.name.toUpperCase().includes(countries.toUpperCase()))
    switch (filteredCountries.length) {
      case 0:
        return (
          <p>No matches!</p>
        )
      case 1:
        const BasicInfo = ({ name, capital, population }) => {
          return (
            <div>
              <h1>{name}</h1>
              <p>capital: {capital}</p>
              <p>population: {population}</p>
            </div >
          )

        }
        const Languages = ({ languages }) => {

          return (

            languages.map((l, i) =>
              <p key={i}> {l.name}</p>
            )
          )
        }

        const Flag = ({ src }) => {
          return (
            <img height="100px" width="200" className="svg" src={src} />
          )
        }
        return (
          filteredCountries.map((c, i) =>
            <div key={i}>
              <BasicInfo
                name={c.name}
                capital={c.capital}
                population={c.population} />
              <h2>Languages</h2>
              <Languages
                languages={c.languages}
              />
              <Flag
                src={c.flag}
              />
            </div>
          )
        )
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        return (
          filteredCountries.map((filt, i) =>
            <div key={i}>
              <p>{filt.name}<button value={filt.name} onClick={handleCountryChange}>show</button></p>
            </div>
          )
        )

      default:
        return (
          <p>Too many matches</p>
        )
    }
  }

  return (
    <form>
      <div>
        find countries <input
          value={countries}
          onChange={handleCountryChange} />
        <CountriesToShow />
      </div >
    </form>
  );
}

export default App;
