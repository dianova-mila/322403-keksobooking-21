'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const pinContainer = document.querySelector(`.map__pins`);
  const pinsCount = 5;

  // Удаление пинов
  const removePins = () => {
    if (map.querySelector(`.map__pin:not(.map__pin--main)`)) {
      const mapPins = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
      for (let pin of mapPins) {
        pin.remove();
      }
    }
  };

  // Рендер пинов

  const renderPins = (adverts) => {
    removePins();

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < Math.min(pinsCount, adverts.length); i++) {
      const pin = window.pin.createPin(adverts[i]);
      fragment.appendChild(pin);

      const onMapPinClick = (evt) => {
        if (evt.target.closest(`.map__pin`) && !evt.target.closest(`.map__pin--main`)) {
          showCard(evt);
        }
      };

      const onMapPinEnterPress = (evt) => {
        if (evt.key === `Enter` &&
          evt.target.closest(`.map__pin`) &&
          !evt.target.closest(`.map__pin--main`)) {
          showCard(evt);
        }
      };

      const showCard = () => {
        window.card.renderCard(adverts[i]);
      };

      pin.addEventListener(`click`, onMapPinClick);
      pin.addEventListener(`keydown`, onMapPinEnterPress);
    }

    pinContainer.appendChild(fragment);
  };

  window.pins = {
    'renderPins': renderPins,
    'removePins': removePins,
  };
})();
