'use strict';


const MAIN_PIN_WIDTH = 62;
const MAIN_PIN_HEIGHT = 84;
const mainMapPin = document.querySelector(`.map__pin--main`);

// Обработчики для mainPin

mainMapPin.addEventListener(`mousedown`, (evt) => {
  if (evt.button === 0) {
    window.utils.setAddressValue();
  }
});

const onMainMapPinMousemove = (evt) => {
  evt.preventDefault();

  if (evt.button === 0) {
    let startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      dragged = true;

      const shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      let mainMapPinY = mainMapPin.offsetTop - shift.y;
      let mainMapPinX = mainMapPin.offsetLeft - shift.x;
      const pinMoveArea = {
        'minX': 0 - (MAIN_PIN_WIDTH / 2),
        'maxX': 1200 - (MAIN_PIN_WIDTH / 2),
        'minY': 130 - MAIN_PIN_HEIGHT,
        'maxY': 630 - MAIN_PIN_HEIGHT,
      };

      if (mainMapPinX < pinMoveArea.minX) {
        mainMapPinX = pinMoveArea.minX + `px`;
      }

      if (mainMapPinX > pinMoveArea.maxX) {
        mainMapPinX = pinMoveArea.maxX + `px`;
      }

      if (mainMapPinY < pinMoveArea.minY) {
        mainMapPinY = pinMoveArea.minY + `px`;
      }

      if (mainMapPinY > pinMoveArea.maxY) {
        mainMapPinY = pinMoveArea.maxY + `px`;
      }

      mainMapPin.style.top = mainMapPinY + `px`;
      mainMapPin.style.left = mainMapPinX + `px`;
      window.utils.setAddressValue();

    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      if (dragged) {
        const onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          mainMapPin.removeEventListener(`click`, onClickPreventDefault);
        };
        mainMapPin.addEventListener(`click`, onClickPreventDefault);
      }

      window.utils.setAddressValue();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  }
};

mainMapPin.addEventListener(`mousedown`, onMainMapPinMousemove);

