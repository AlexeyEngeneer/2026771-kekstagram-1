import { createArrayFotoCards } from './fotocard.js';
import { createFullscreenFoto } from './fullscreen-foto.js';

let eventHandlerInstalled = false;

const selectingFullscreenFoto = (createdData) => {
  const fullscreenFotoBlock = document.querySelector('.pictures');

  if (!eventHandlerInstalled) {
    const handleClick = (evt) => {
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
    eventHandlerInstalled = true;
  }

  createArrayFotoCards(createdData);
};

export { selectingFullscreenFoto };
