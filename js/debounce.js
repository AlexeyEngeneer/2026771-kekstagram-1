import { setFilterRandom, setFilterDefault, setFilterDiscussed } from './filters.js';

const VALUE_TIMEOUT = 500;
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');


function debounce(callback, timeoutDelay) {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, timeoutDelay);
  };
}

const handleFilterChange = debounce((filterFunction, picturesData) => {
  filterFunction(picturesData);
}, VALUE_TIMEOUT);

const defaultDebounce = (picturesData) => {
  filterDefault.addEventListener('click', () => {
    handleFilterChange(setFilterDefault, picturesData);
  });
};

const randomDebounce = (picturesData) => {
  filterRandom.addEventListener('click', () => {
    handleFilterChange(setFilterRandom, picturesData);
  });
};

const discussedDebounce = (picturesData) => {
  filterDiscussed.addEventListener('click', () => {
    handleFilterChange(setFilterDiscussed, picturesData);
  });
};

export { defaultDebounce, discussedDebounce, randomDebounce };
