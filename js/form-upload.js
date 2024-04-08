import { isEscape } from './utilise.js';
import { updateScale, addEventScale } from './scale-foto.js';
import { changeEffect, updateChangeEffect, removeEventChangeEffect } from './effects-foto.js';
import { validateCommentLength, isHashtagNotOneSymbol, isHashtagTrueAmount, isHashtagTrueLength, isHashtagTrueStart, isHashtagTrueSymbols, isHashtagUnique } from './validation-data.js';
import { sendData } from './server-manager.js';

const bodyElement = document.querySelector('body');
const formElement = bodyElement.querySelector('.img-upload__form');
const inputFile = formElement.querySelector('#upload-file');
const imgOverlay = formElement.querySelector('.img-upload__overlay');
const closeButton = formElement.querySelector('#upload-cancel');
const userHashtag = imgOverlay.querySelector('.text__hashtags');
const userComment = imgOverlay.querySelector('.text__description');
const submitButton = imgOverlay.querySelector('.img-upload__submit');
const imgPreview = imgOverlay.querySelector('.img-upload__preview img');
const fileChooser = formElement.querySelector('.img-upload__start input[type=file]');

const templateError = document.querySelector('#error');
const templateSuccess = document.querySelector('#success');

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
  addEventUploadForm();
  imgOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  addEventScale();
  changeEffect();
};

const closeUploadModal = () => {
  removeEventUploadForm();
  imgOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  pristine.reset();
  formElement.value = null;
  updateScale();
  updateChangeEffect();
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
  imgPreview.src = 'img/upload-default-image.jpg';
  fileChooser.value = '';
};

function onDocumentKeydown (evt) {
  if (isEscape(evt) && !isActiveComment() && !isActiveHashtag()) {
    evt.preventDefault();
    closeUploadModal();
  }
}

const isValid = () => pristine.validate();


function blockButton () {

  if (!isValid()) {
    submitButton.disabled = true;
    const errorsElements = document.querySelectorAll('.form__error');
    errorsElements.forEach((element) => {
      element.style.background = 'linear-gradient(to right, rgba(255, 255, 0, 0.3), rgba(255, 0, 0, 0.3))';
    });
  } else {
    submitButton.disabled = false;
  }
}

const hideSuccessMessage = () => {
  const successSection = document.querySelector('.success');
  successSection.remove();
  document.removeEventListener('keydown', onClickEscapeInSucces);
  document.removeEventListener('click', onClickOutspace);
  formElement.removeEventListener('input', blockButton);
};

const showSuccessMessage = () => {
  const successClone = templateSuccess.content.cloneNode(true);
  const successMessage = successClone.querySelector('.success__title');
  successMessage.style.fontSize = '25px';
  document.body.appendChild(successClone);
  const closeButtonSuccess = document.querySelector('.success__button');
  closeButtonSuccess.addEventListener('click', hideSuccessMessage);
  document.addEventListener('keydown', onClickEscapeInSucces);
  document.addEventListener('click', onClickOutspace);
  formElement.reset();
};

const hideErrorMessage = () => {
  const errorSection = document.querySelector('.error');
  const closeButtonError = document.querySelector('.error__button');
  errorSection.remove();
  document.addEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('keydown', onClickEscapeInError);
  document.removeEventListener('click', onClickOutspace);
  closeButtonError.removeEventListener('click', hideErrorMessage);
};

const showErrorMessage = () => {
  const errorClone = templateError.content.cloneNode(true);
  const errorMessage = errorClone.querySelector('.error__title');
  errorMessage.style.fontSize = '25px';
  document.body.appendChild(errorClone);
  const closeButtonError = document.querySelector('.error__button');
  closeButtonError.addEventListener('click', hideErrorMessage);
  document.addEventListener('keydown', onClickEscapeInError);
  document.addEventListener('click', onClickOutspace);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onClickOutspace (event) {
  const messageSuccessBlock = document.querySelector('.success__inner');
  const messageErrorBlock = document.querySelector('.error__inner');
  if (messageSuccessBlock && !messageSuccessBlock.contains(event.target)) {
    hideSuccessMessage();
  } else if (messageErrorBlock && !messageErrorBlock.contains(event.target)){
    hideErrorMessage();
  }
}

function onClickEscapeInSucces(evt) {
  if (isEscape(evt)) {
    hideSuccessMessage();
  }
}

function onClickEscapeInError(evt) {
  if (isEscape(evt)) {
    evt.preventDefault();
    hideErrorMessage();
  }
}

function sendForm () {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (isValid()) {
      submitButton.disabled = true;
      submitButton.textContent = 'В процессе...';
      sendData(new FormData(formElement))
        .then(() => {
          showSuccessMessage();
          closeUploadModal();
        })
        .catch(() => {
          showErrorMessage();
          submitButton.disabled = false;
          submitButton.textContent = 'Попробовать еще раз';
        });
    }
  });
}

function removeEventUploadForm () {
  removeEventChangeEffect();
  formElement.removeEventListener('input', blockButton);
  closeButton.removeEventListener('click', closeUploadModal);
  document.removeEventListener('keydown', onDocumentKeydown);
}

function addEventUploadForm () {
  formElement.addEventListener('input', blockButton);
  closeButton.addEventListener('click', closeUploadModal);
  document.addEventListener('keydown', onDocumentKeydown);
}

inputFile.addEventListener('change', openUploadModal);

export { sendForm, closeUploadModal };
