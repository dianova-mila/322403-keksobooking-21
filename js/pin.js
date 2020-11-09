'use strict';

const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);
const map = document.querySelector(`.map`);

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

  const showCard = (evt) => {
    if (map.querySelector(`.map__pin--active`)) {
      map.querySelector(`.map__pin--active`).classList.remove(`map__pin--active`);
    }
    evt.target.closest(`.map__pin`).classList.add(`map__pin--active`);
    window.card.render(advert);
  };

  pin.addEventListener(`click`, onMapPinClick);
  pin.addEventListener(`keydown`, onMapPinEnterPress);

  return pin;
};

window.pin = {
  'create': createPin
};
