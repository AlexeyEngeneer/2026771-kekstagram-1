const changeEffectElement = document.querySelectorAll('.effects__radio');
const previewFoto = document.querySelector('.img-upload__preview');
const sliderConteiner = document.querySelector('.img-upload__effect-level');
const deepEffect = sliderConteiner.querySelector('.effect-level__value');
const sliderElement = sliderConteiner.querySelector('.effect-level__slider');

const updateChangeEffect = () => {
  previewFoto.style = '';
  previewFoto.className = 'img-upload__preview';
};

const changeEffectFunction = (evt) => {
  if (evt.target.checked) {
    previewFoto.className = (`img-upload__preview effects__preview--${evt.target.value}`);
    if (evt.target.value === 'none') {
      sliderConteiner.classList.add('hidden');
      updateChangeEffect();
    } else if (evt.target.value === 'chrome') {
      sliderConteiner.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1
      });
    } else if (evt.target.value === 'sepia') {
      sliderConteiner.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1
      });
    } else if (evt.target.value === 'marvin') {
      sliderConteiner.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1
      });
    } else if (evt.target.value === 'phobos') {
      sliderConteiner.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1
      });
    } else if (evt.target.value === 'heat') {
      sliderConteiner.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1
      });
    }
  }
};

const changeEffect = () => {
  sliderConteiner.classList.add('hidden');
  changeEffectElement.forEach((element) => {

    element.addEventListener('change', changeEffectFunction);
  });
};


const removeEventChangeEffect = () => {
  changeEffectElement.forEach((element) => {
    element.removeEventListener('change', changeEffectFunction);
  });
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', (values) => {

  const sliderValue = parseFloat(values);

  const selectedEffect = document.querySelector('.effects__radio:checked').value;
  switch (selectedEffect) {

    case 'chrome':
      previewFoto.style.filter = `grayscale(${sliderValue})`;
      break;
    case 'sepia':
      previewFoto.style.filter = `sepia(${sliderValue})`;
      break;
    case 'marvin':
      previewFoto.style.filter = `invert(${sliderValue}%)`;
      break;
    case 'phobos':
      previewFoto.style.filter = `blur(${sliderValue}px)`;
      break;
    case 'heat':
      previewFoto.style.filter = `brightness(${sliderValue})`;
      break;
  }
  deepEffect.value = sliderValue;
});

export { changeEffect, updateChangeEffect, removeEventChangeEffect };

