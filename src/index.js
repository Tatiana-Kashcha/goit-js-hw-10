import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchEl = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');

searchEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  const country = evt.target.value.trim();

  fetchCountries(country)
    .then(data => (countryInfo.innerHTML = createMarkup(data)))
    .catch(error => console.log(error));
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        name: { official },
        capital,
        population,
        flags: { svg },
        languages,
      }) => `<div class="country">
      <img class="country-flag" src=${svg} alt="Прапор ${official}">
      <h2 class="country-title">${official}</h2>
      </div>
      <ul class="info">
        <li class="info-text"><span class="info-title">Capital: </span>${capital}</li>
        <li class="info-text"><span class="info-title">Population: </span>${population}</li>
        <li class="info-text"><span class="info-title">Languages: </span>${languages}</li>
      </ul>
    `
    )
    .join('');
}
