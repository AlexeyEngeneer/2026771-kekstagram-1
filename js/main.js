import { selectingFullscreenFoto, addEventFullscreenFoto } from './gallery.js';
import './scale-foto.js';
import './effects-foto.js';
import {getData } from './server-manager.js';
import {showAlert } from './utilise.js';
import { sendForm } from './form-upload.js';
import './form-upload.js';
import { defaultDebounce, discussedDebounce, randomDebounce } from './debounce.js';
import'./debounce.js';
import './file-manager.js';

const filter = document.querySelector('.img-filters');

getData()
  .then((picturesData) => {
    selectingFullscreenFoto(picturesData);
    addEventFullscreenFoto();
    defaultDebounce(picturesData);
    discussedDebounce(picturesData);
    randomDebounce(picturesData);
    filter.classList.remove('img-filters--inactive');
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

sendForm();
