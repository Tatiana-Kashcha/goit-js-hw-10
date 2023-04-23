import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchEl = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

searchEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  const country = evt.target.value.trim();

  fetchCountries(country)
    .then(data => (countryInfo.innerHTML = createMarkup(data)))
    // .then(data => (countryList.innerHTML = createMarkupAll(data)))
    .catch(error => console.log(error));
}
/**
 * Створює розмітку для однієї країни за вхідними параметрами
 * @param {*} arr
 * @returns розмітку для рендеру
 */
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
        <li class="info-text"><span class="info-title">Languages: </span>${Object.values(
          languages
        ).join(', ')}</li>
      </ul>
    `
    )
    .join('');
}

/**
 * Створює розмітку для багатьох країн за вхідними параметрами
 * @param {*} arrAll
 * @returns розмітку для рендеру
 */
function createMarkupAll(arrAll) {
  return arrAll
    .map(
      ({ name: { official }, flags: { svg } }) => `<li class="country-all">
      <img class="country-flag" src=${svg} alt="Прапор ${official}">
      <h2 class="country-title-all">${official}</h2>
      </li>
    `
    )
    .join('');
}
