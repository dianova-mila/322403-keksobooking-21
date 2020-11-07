'use strict';

(() => {
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
      const pin = window.pin.create(adverts[i]);
      fragment.appendChild(pin);
    }

    pinContainer.appendChild(fragment);
  };

  window.pins = {
    'render': renderPins,
    'remove': removePins,
  };
})();
