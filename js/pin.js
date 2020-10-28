'use strict';

(function () {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const pinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);

  const createPin = (advert) => {
    let pin = pinTemplate.cloneNode(true);

    pin.style.left = `${advert.location.x - PIN_WIDTH / 2}px`;
    pin.style.top = `${advert.location.y - PIN_HEIGHT}px`;

    let pinImage = pin.querySelector(`img`);
    pinImage.src = advert.author.avatar;
    pinImage.alt = advert.offer.title;

    return pin;
  };

  window.pin = {
    'createPin': createPin
  };
})();
