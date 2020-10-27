'use strict';

(function () {
  const MAIN_PIN_WIDTH = 62;
  const MAIN_PIN_HEIGHT = 84;
  const mainMapPin = document.querySelector(`.map__pin--main`);
  const addressInput = document.querySelector(`#address`);

  window.utils = {
    'getRandomItemFromArray': (array) => {
      return array[Math.floor(Math.random() * array.length)];
    },
    'getRandomNumber': function (minValue, maxValue) {
      return minValue + Math.floor(Math.random() * (maxValue + 1 - minValue));
    },
    'getArrayRandomLength': (array) => {
      return array.slice(0, window.utils.getRandomNumber(1, (array.length - 1)));
    },
    'setAddressValue': () => {
      let mainMapPinX = parseInt(getComputedStyle(mainMapPin).left, 10) + (MAIN_PIN_WIDTH / 2);
      let mainMapPinY = parseInt(getComputedStyle(mainMapPin).top, 10) + MAIN_PIN_HEIGHT;
      addressInput.value = `${mainMapPinX}, ${mainMapPinY}`;
    },
    'switchForm': (formArray, disable) => {
      for (let element of formArray) {
        element.disabled = disable;
      }
    },
  };
})();
