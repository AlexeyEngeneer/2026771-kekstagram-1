import { selectingFullscreenFoto } from './gallery.js';
import './form-upload.js';
import './scale-foto.js';
import './effects-foto.js';
import {getData } from './server-manager.js';
import {showAlert} from './utilise.js';
import { sendForm, closeUploadModal } from './form-upload.js';

getData()
  .then((picturesData) => {
    selectingFullscreenFoto(picturesData);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

sendForm(closeUploadModal);
