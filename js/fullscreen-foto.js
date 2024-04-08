import { isEscape } from './utilise.js';

const fullscreenFoto = document.querySelector('.big-picture');
const addresFotoBlock = fullscreenFoto.querySelector('.big-picture__img');
const addresFoto = addresFotoBlock.querySelector('img');
const likesAmount = fullscreenFoto.querySelector('.likes-count');
const commentsBlock = fullscreenFoto.querySelector('.social__comments');
const fotoDescription = fullscreenFoto.querySelector('.social__caption');
const closeButton = fullscreenFoto.querySelector('.big-picture__cancel');
const bodyElement = document.querySelector('body');
const socialBlock = document.querySelector('.big-picture__social');
const counterComments = socialBlock.querySelector('.social__comment-count');
const buttonCommentsLoader = socialBlock.querySelector('.comments-loader');

const createFullscreenComment = ({avatar, name, message}) => {
  const li = document.createElement('li');
  const img = document.createElement('img');
  const p = document.createElement('p');
  li.classList.add('social__comment');
  li.classList.add('hidden');
  img.classList.add('social__picture');
  img.src = avatar;
  img.alt = name;
  img.width = 35;
  img.height = 35;
  p.classList.add('social__text');
  p.textContent = message;
  li.appendChild(img);
  li.appendChild(p);
  img.style.userSelect = 'none';
  return li;
};

const createFullscreenComments = (comment) => {
  const deleteContent = commentsBlock.querySelectorAll('.social__comment');
  deleteContent.forEach((element) => element.remove());
  const fragment = document.createDocumentFragment();
  const commentElement = comment.map((element) => createFullscreenComment(element));
  commentElement.map((element) => fragment.append(element));
  commentsBlock.append(fragment);
};

let commentPortion = 5;
let startIndx = 0;
const getPortionComments = () => {
  const newLiElement = commentsBlock.querySelectorAll('.social__comment');
  const treshold = commentPortion + startIndx > newLiElement.length ? newLiElement.length : commentPortion + startIndx;
  for(let i = startIndx; i < treshold; i++) {
    if (newLiElement.item(i) !== null) {
      newLiElement[i].classList.remove('hidden');
      counterComments.innerHTML = '';
      counterComments.innerHTML = `${i + 1} из <span class="comments-count">${newLiElement.length}</span> комментариев`;
      if (newLiElement.length <= 5) {
        buttonCommentsLoader.classList.add('hidden');
      }
      if (i === newLiElement.length - 1) {
        buttonCommentsLoader.classList.add('hidden');
      }
    } else {
      buttonCommentsLoader.disabled = true;
    }
  }
  startIndx += commentPortion;
};

buttonCommentsLoader.addEventListener('click', () => {
  getPortionComments();
});

const closeFullscreenModal = () => {
  fullscreenFoto.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', closeFullscreenModal);
  commentPortion = 5;
  startIndx = 0;
  buttonCommentsLoader.disabled = false;
  buttonCommentsLoader.textContent = 'Загрузить еще';
};

function onDocumentKeydown (evt) {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeFullscreenModal();
  }
}

const createFullscreenFotoData = ({url, likes, description}) => {
  addresFoto.src = url;
  likesAmount.textContent = likes;
  fotoDescription.textContent = description;
  addresFoto.style.userSelect = 'none';
};

const createFullscreenFoto = (findedFotoData) => {
  fullscreenFoto.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  createFullscreenFotoData(findedFotoData);
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', closeFullscreenModal);
  counterComments.classList.remove('hidden');
  buttonCommentsLoader.classList.remove('hidden');
  createFullscreenComments(findedFotoData.comments);
  getPortionComments();
};

export { createFullscreenFoto };
