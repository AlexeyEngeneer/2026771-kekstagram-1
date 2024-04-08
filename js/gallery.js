import { createArrayFotoCards } from './fotocard.js';
import { createFullscreenFoto } from './fullscreen-foto.js';

const fullscreenFotoBlock = document.querySelector('.pictures');

let handleClick;

const selectingFullscreenFoto = (createdData) => {

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

  createArrayFotoCards(createdData);

};

function addEventFullscreenFoto () {
  fullscreenFotoBlock.addEventListener('click', handleClick);
}

export { selectingFullscreenFoto, addEventFullscreenFoto };
