'use strict';

(function () {
  const pinContainer = document.querySelector(`.map__pins`);

  window.pins = {
    'renderPins': function (adverts) {
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < adverts.length; i++) {
        const pin = window.pin.createPin(adverts[i]);
        pin.dataset.advertId = `${i}`;
        fragment.appendChild(pin);
      }

      pinContainer.appendChild(fragment);
    },
  };
})();
