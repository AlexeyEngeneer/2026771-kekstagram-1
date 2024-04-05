import { createArrayFotoCards } from './fotocard.js';
import { createFullscreenFoto } from './fullscreen-foto.js';

const fullscreenFotoBlock = document.querySelector('.pictures');

let handleClick;

const selectingFullscreenFoto = (createdData) => {

  removeEventFullscreenFoto();

  handleClick = (evt) => {
    const targetPicture = evt.target.closest('[data-new-template-id]');
    if (targetPicture){
      evt.preventDefault();
      const findPicture = createdData.find((element) =>
        element.id === Number(targetPicture.dataset.newTemplateId)
      );
      createFullscreenFoto(findPicture);
    }
  };

  fullscreenFotoBlock.addEventListener('click', handleClick);

  createArrayFotoCards(createdData);
};

function removeEventFullscreenFoto () {
  fullscreenFotoBlock.removeEventListener('click', handleClick);
}

export { selectingFullscreenFoto };
