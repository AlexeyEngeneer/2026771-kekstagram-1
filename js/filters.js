import { selectingFullscreenFoto } from './gallery.js';

const FOTO_AMOUNT = 10;

const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const filterButtons = document.querySelectorAll('.img-filters__button');

const setActiveFilterButton = (buttons) => {
  filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
  buttons.classList.add('img-filters__button--active');
};

const clearFoto = () => {
  const fotos = document.querySelectorAll('.picture');
  fotos.forEach((foto) => {
    foto.remove();
  });
};

const getRandomPictures = (data, count) => {
  const dataCopy = [...data];
  dataCopy.sort(() => Math.random() - 0.5);
  return dataCopy.slice(0, count);
};

const sortByCommentsAmount = (data) => {
  const sortComments = data.slice().sort((a, b) => b.comments.length - a.comments.length);
  return sortComments;
};

const setFilterDefault = (picturesData) => {
  clearFoto();
  setActiveFilterButton(filterDefault);
  selectingFullscreenFoto(picturesData);
};

const setFilterRandom = (picturesData) => {
  clearFoto();
  setActiveFilterButton(filterRandom);
  const randomPictures = getRandomPictures(picturesData, FOTO_AMOUNT);
  selectingFullscreenFoto(randomPictures);
};

const setFilterDiscussed = (picturesData) => {
  clearFoto();
  setActiveFilterButton(filterDiscussed);
  const discussedPictures = sortByCommentsAmount(picturesData);
  selectingFullscreenFoto(discussedPictures);
};

export { setFilterRandom, setFilterDefault, setFilterDiscussed };

