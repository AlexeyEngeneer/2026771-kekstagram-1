const changeEffectElement = document.querySelectorAll('.effects__radio');
const previewFoto = document.querySelector('.img-upload__preview');
const deepEffect = document.querySelector('.effect-level__value');
const sliderConteiner = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');

const updateChangeEffect = () => {
  previewFoto.className = '';
  previewFoto.style.filter = 'none';
  sliderConteiner.classList.remove('hidden');
  // document.querySelector('.effects__radio:checked').value = 'none';
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
    case 'none':
    default:
      updateChangeEffect();
      break;
  }
  deepEffect.value = sliderValue;
});

const changeEffect = () => {
  sliderConteiner.classList.add('hidden');
  changeEffectElement.forEach((element) => {
    element.addEventListener('change', (evt) => {
      if (evt.target.checked) {
        previewFoto.className = `effects__preview--${element.value}`;
        // updateChangeEffect();
        if (element.value === 'none') {
          sliderConteiner.classList.add('hidden');
        } else if (element.value === 'chrome') {
          sliderConteiner.classList.remove('hidden');
          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
            },
            start: 1,
            step: 0.1
          });
        } else if (element.value === 'sepia') {
          sliderConteiner.classList.remove('hidden');
          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
            },
            start: 1,
            step: 0.1
          });
        } else if (element.value === 'marvin') {
          sliderConteiner.classList.remove('hidden');
          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 100,
            },
            start: 100,
            step: 1
          });
        } else if (element.value === 'phobos') {
          sliderConteiner.classList.remove('hidden');
          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 3,
            },
            start: 3,
            step: 0.1
          });
        } else if (element.value === 'heat') {
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
    });
  });
};


export{ changeEffect, updateChangeEffect };

