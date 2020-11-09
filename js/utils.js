'use strict';

const MAIN_PIN_WIDTH = 62;
const MAIN_PIN_HEIGHT = 84;
const MAIN_PIN_START_HEIGHT = 65;
const mainMapPin = document.querySelector(`.map__pin--main`);
const addressInput = document.querySelector(`#address`);

window.utils = {
  'setAddressValue': () => {
    let mainMapPinX = Math.round(parseInt(getComputedStyle(mainMapPin).left, 10) + (MAIN_PIN_WIDTH / 2));
    let mainMapPinY = Math.round(parseInt(getComputedStyle(mainMapPin).top, 10) + MAIN_PIN_HEIGHT);
    addressInput.value = `${mainMapPinX}, ${mainMapPinY}`;
  },
  'setStartAddressValue': () => {
    let mainMapPinX = Math.round(parseInt(getComputedStyle(mainMapPin).left, 10) + (MAIN_PIN_WIDTH / 2));
    let mainMapPinY = Math.round(parseInt(getComputedStyle(mainMapPin).top, 10) + (MAIN_PIN_START_HEIGHT / 2));
    addressInput.value = `${mainMapPinX}, ${mainMapPinY}`;
  },
  'switchForm': (form, disable) => {
    for (let element of form) {
      element.disabled = disable;
    }
  },
};
