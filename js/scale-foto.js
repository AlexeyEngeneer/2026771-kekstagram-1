import { isMinus, isPlus } from './utilise.js';

const MAX_SCALE = 100;
const MIN_SCALE = 25;
const SCALE_STEP = 25;
const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const inputSizeElement = document.querySelector('.scale__control--value');
const sizeFoto = document.querySelector('.img-upload__preview');

let scaleValue = MAX_SCALE;

function onScaleKeydown (evt) {
  if (isPlus(evt) && scaleValue < MAX_SCALE) {
    evt.preventDefault();
    increaseScale();
  } else if (isMinus(evt) && scaleValue > MIN_SCALE) {
    evt.preventDefault();
    decreaseScale();
  }
}

const updateScale = () => {
  inputSizeElement.value = '';
  sizeFoto.style.transform = '';
  scaleValue = MAX_SCALE;
  buttonBigger.disabled = false;
  buttonSmaller.disabled = false;
  removeEvent();
};

function increaseScale () {
  buttonSmaller.disabled = false;
  scaleValue += SCALE_STEP;
  inputSizeElement.value = `${scaleValue}%`;
  sizeFoto.style.transform = `scale(${scaleValue / 100})`;
  if(inputSizeElement.value === `${MAX_SCALE}%`) {
    buttonBigger.disabled = true;
  }
}

function decreaseScale () {
  buttonBigger.disabled = false;
  scaleValue -= SCALE_STEP;
  inputSizeElement.value = `${scaleValue}%`;
  sizeFoto.style.transform = `scale(${scaleValue / 100})`;
  if(inputSizeElement.value === `${MIN_SCALE}%`) {
    buttonSmaller.disabled = true;
  }
}
function addEventScale () {
  buttonBigger.disabled = true;
  inputSizeElement.value = `${MAX_SCALE}%`;
  sizeFoto.style.transform = `scale(${MAX_SCALE / 100})`;
  buttonBigger.addEventListener('click', increaseScale);
  buttonSmaller.addEventListener('click', decreaseScale);
  document.addEventListener('keydown', onScaleKeydown);
}

function removeEvent () {
  buttonBigger.removeEventListener('click', increaseScale);
  buttonSmaller.removeEventListener('click', decreaseScale);
  document.removeEventListener('keydown', onScaleKeydown);
}

export { updateScale, addEventScale };

