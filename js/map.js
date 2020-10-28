'use strict';

(function () {
  const MAIN_PIN_WIDTH = 62;
  const MAIN_PIN_HEIGHT = 84;
  const map = document.querySelector(`.map`);
  const mainMapPin = document.querySelector(`.map__pin--main`);

  mainMapPin.addEventListener(`mousedown`, (evt) => {
    if (evt.button === 0) {
      window.utils.setAddressValue();
    }
  });

  const onMapPinClick = (evt) => {
    if (evt.target.closest(`.map__pin`) && !evt.target.closest(`.map__pin--main`)) {
      const advertId = evt.target.closest(`.map__pin`).dataset.advertId;
      window.card.renderCard(window.data.advertsArray[advertId]);

      const mapPinCloseButton = map.querySelector(`.popup__close`);
      mapPinCloseButton.addEventListener(`click`, onMapPinCloseButtonClick);
      map.addEventListener(`keydown`, onMapPinCloseButtonEscPress);
    }
  };

  const onMapPinEnterPress = (evt) => {
    if (evt.key === `Enter` &&
      evt.target.closest(`.map__pin`) &&
      !evt.target.closest(`.map__pin--main`)) {
      const advertId = evt.target.closest(`.map__pin`).dataset.advertId;
      window.card.renderCard(window.data.advertsArray[advertId]);

      const mapPinCloseButton = map.querySelector(`.popup__close`);
      mapPinCloseButton.addEventListener(`click`, onMapPinCloseButtonClick);
      map.addEventListener(`keydown`, onMapPinCloseButtonEscPress);
    }
  };

  map.addEventListener(`click`, onMapPinClick);
  map.addEventListener(`keydown`, onMapPinEnterPress);

  const closeCard = () => map.querySelector(`.map__card`).remove();

  const onMapPinCloseButtonClick = (evt) => {
    evt.preventDefault();
    closeCard();
  };

  const onMapPinCloseButtonEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeCard();
    }
  };

  const onMainMapPinMousemove = (evt) => {
    evt.preventDefault();

    let startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;

    const onMouseMove = function (moveEvt) {
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

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (dragged) {
        const onClickPreventDefault = function (clickEvt) {
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
  };

  mainMapPin.addEventListener(`mousedown`, onMainMapPinMousemove);
})();
