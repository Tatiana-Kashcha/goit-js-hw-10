import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchEl = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

searchEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

/**
 * Рендерить розмітку в залежності від результатів пошуку
 * @param {*} evt
 */
function onSearch(evt) {
  const country = evt.target.value.trim();
  if (country === '') {
    return;
  }

  fetchCountries(country)
    .then(data => {
      console.log(data.length > 10); //для перевірки

      if (data.length === 1) {
        countryInfo.innerHTML = createMarkup(data);
        countryList.innerHTML = '';
      } else if (data.length >= 2 && data.length <= 10) {
        countryList.innerHTML = createMarkupAll(data);
        countryInfo.innerHTML = '';
      } else if (data.length > 10) {
        countryInfo.innerHTML = '';
        countryList.innerHTML = '';
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      countryInfo.innerHTML = '';
      countryList.innerHTML = '';
    });
}

/**
 * Створює розмітку для однієї країни за вхідними параметрами
 * @param {*} arr масив об'єктів
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
 * @param {*} arrAll масив об'єктів
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
