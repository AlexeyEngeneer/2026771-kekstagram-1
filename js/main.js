import { selectingFullscreenFoto } from './gallery.js';
import './scale-foto.js';
import './effects-foto.js';
import {getData } from './server-manager.js';
import {showAlert } from './utilise.js';
import { sendForm } from './form-upload.js';
import './form-upload.js';

getData()
  .then((picturesData) => {
    selectingFullscreenFoto(picturesData);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

sendForm();
