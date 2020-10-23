'use strict';

(function () {
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
      window.cards.renderCard(window.data.advertsArray[advertId]);

      const mapCloseButton = map.querySelector(`.popup__close`);
      mapCloseButton.addEventListener(`click`, onMapCloseButtonClick);
      map.addEventListener(`keydown`, onMapCloseButtonEscPress);
    }
  };

  const onMapPinEnterPress = (evt) => {
    if (evt.key === `Enter` &&
      evt.target.closest(`.map__pin`) &&
      !evt.target.closest(`.map__pin--main`)) {
      const advertId = evt.target.closest(`.map__pin`).dataset.advertId;
      window.cards.renderCard(window.data.advertsArray[advertId]);
    }
  };

  map.addEventListener(`click`, onMapPinClick);
  map.addEventListener(`keydown`, onMapPinEnterPress);

  const closeCard = () => map.querySelector(`.map__card`).remove();

  const onMapCloseButtonClick = (evt) => {
    evt.preventDefault();
    closeCard();
  };

  const onMapCloseButtonEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeCard();
    }
  };
})();
