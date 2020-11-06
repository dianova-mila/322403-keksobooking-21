'use strict';

(function () {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const pinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);

  // Создание пина

  const createPin = (advert) => {
    let pin = pinTemplate.cloneNode(true);

    pin.style.left = `${advert.location.x - PIN_WIDTH / 2}px`;
    pin.style.top = `${advert.location.y - PIN_HEIGHT}px`;

    let pinImage = pin.querySelector(`img`);
    pinImage.src = advert.author.avatar;
    pinImage.alt = advert.offer.title;

    const onMapPinClick = (evt) => {
      if (evt.target.closest(`.map__pin`) && !evt.target.closest(`.map__pin--main`)) {
        showCard();
      }
    };

    const onMapPinEnterPress = (evt) => {
      if (evt.key === `Enter` &&
        evt.target.closest(`.map__pin`) &&
        !evt.target.closest(`.map__pin--main`)) {
        showCard();
      }
    };

    const showCard = () => {
      window.card.render(advert);
    };

    pin.addEventListener(`click`, onMapPinClick);
    pin.addEventListener(`keydown`, onMapPinEnterPress);

    return pin;
  };

  window.pin = {
    'create': createPin
  };
})();
