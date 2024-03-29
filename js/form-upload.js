import { isEscape, showAlert } from './utilise.js';
import { updateScale, addEventScale } from './scale-foto.js';
import { changeEffect, updateChangeEffect } from './effects-foto.js';
import { validateCommentLength, isHashtagNotOneSymbol, isHashtagTrueAmount, isHashtagTrueLength, isHashtagTrueStart, isHashtagTrueSymbols, isHashtagUnique } from './validation-data.js';
import { sendData } from './server-manager.js';

const inputFile = document.querySelector('#upload-file');
const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const imgOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('#upload-cancel');
const userHashtag = document.querySelector('.text__hashtags');
const userComment = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'form__error',
});

const isActiveComment = () => document.activeElement === userComment;
const isActiveHashtag = () => document.activeElement === userHashtag;

pristine.addValidator(
  userComment,
  validateCommentLength,
  'Комментарий не должен содержать более 140 символов',
);

pristine.addValidator(
  userHashtag,
  isHashtagTrueLength,
  'Длина хэштега не должна превышать 20 символов',
);

pristine.addValidator(
  userHashtag,
  isHashtagTrueStart,
  'Пропущен символ "#" в начале хэштега',
);

pristine.addValidator(
  userHashtag,
  isHashtagTrueSymbols,
  'Введены недопустимые символы',
);

pristine.addValidator(
  userHashtag,
  isHashtagTrueAmount,
  'Максимальное количество хэштегов не больше 5',
);

pristine.addValidator(
  userHashtag,
  isHashtagUnique,
  'Такой хэштег уже существует',
);

pristine.addValidator(
  userHashtag,
  isHashtagNotOneSymbol,
  'Хэштег не может состоять из одного символа',
);

const openUploadModal = () => {
  imgOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  addEventScale();
  changeEffect();
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploadModal = () => {
  imgOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  pristine.reset();
  inputFile.value = null;
  updateScale();
  updateChangeEffect();
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscape(evt) && !isActiveComment() && !isActiveHashtag()) {
    evt.preventDefault();
    closeUploadModal();
  }
}

function blockButton () {

  const isValid = pristine.validate();

  if (!isValid) {
    submitButton.disabled = true;
    const errorsElements = document.querySelectorAll('.form__error');
    errorsElements.forEach((element) => {
      element.style.background = 'linear-gradient(to right, rgba(255, 255, 0, 0.3), rgba(255, 0, 0, 0.3))';
    });
  } else {
    submitButton.disabled = false;
  }
}


function sendForm (onSuccess) {
  const isValid = pristine.validate();
  submitButton.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (isValid) {
      submitButton.disabled = true;
      submitButton.textContent = 'в процессе...';
      sendData(new FormData(formElement))
        .then(onSuccess)
        .catch(
          (err) => {
            showAlert(err.message);
          }
        )
        .finally(submitButton.disabled = false);
    }
  });
}

formElement.addEventListener('input', blockButton);
inputFile.addEventListener('change', openUploadModal);
closeButton.addEventListener('click', closeUploadModal);

export { sendForm, closeUploadModal };
