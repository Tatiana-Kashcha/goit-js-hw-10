import debounce from 'lodash.debounce';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const searchEl = document.querySelector('#search-box');

searchEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(evt) {
  const country = evt.target.value;

  fetchCountries(country)
    .then('ok')
    .catch(error => console.log(error))
    .finally(() => {
      //   searchEl.value = '';
    });
}
