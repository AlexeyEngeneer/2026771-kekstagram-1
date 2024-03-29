const ALERT_SHOW_TIME = 5000;

const getRandomNumber = (a, b) => {
  const minValue = Math.ceil(Math.min(a, b));
  const maxValue = Math.floor(Math.max(a, b));
  const result = Math.random() * (maxValue - minValue + 1) + minValue;
  return Math.floor(result);
};

const getArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const createCounter = () =>{
  let currentCount = 1;
  return function() {
    return currentCount++;
  };
};

const isEscape = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { getRandomNumber, getArrayElement, createCounter, isEscape, showAlert };
