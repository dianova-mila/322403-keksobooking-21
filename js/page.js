'use strict';

(function () {
  const MAIN_MAP_PIN_DEFAULT_POSITION = {
    'top': `375px`,
    'left': `570px`,
  };
  const map = document.querySelector(`.map`);
  const mainMapPin = document.querySelector(`.map__pin--main`);
  const form = document.querySelector(`.ad-form`);
  const formFieldsets = form.querySelectorAll(`fieldset`);
  const mapFilters = document.querySelector(`.map__filters`);
  const mapFiltersArray = mapFilters.children;
  const URLLoad = `https://21.javascript.pages.academy/keksobooking/data`;

  // Активировать страницу

  const activatePage = () => {
    map.classList.remove(`map--faded`);
    form.classList.remove(`ad-form--disabled`);

    window.utils.switchForm(formFieldsets, false);
    window.server.request(``, `GET`, URLLoad, successLoadHandler, window.error.showError);

    mainMapPin.removeEventListener(`mousedown`, onMainMapPinMouseDown);
    mainMapPin.removeEventListener(`keydown`, onMainMapPinEnterPress);
  };

  const successLoadHandler = (serverResponse) => {
    window.data = {
      'advertsArray': serverResponse,
    };
    window.data.activeAdvertsArray = window.data.advertsArray;
    window.pins.renderPins(window.data.activeAdvertsArray);

    window.utils.switchForm(mapFiltersArray, false);
  };

  const onMainMapPinMouseDown = (evt) => {
    if (evt.button === 0) {
      activatePage();
    }
  };

  const onMainMapPinEnterPress = (evt) => {
    if (evt.key === `Enter`) {
      activatePage();
    }
  };

  // Деактивировать страницу

  const deactivatePage = () => {
    if (!map.classList.contains(`map--faded`)) {
      map.classList.add(`map--faded`);
    }

    if (!form.classList.contains(`ad-form--disabled`)) {
      form.classList.add(`ad-form--disabled`);
    }

    window.pins.removePins();
    window.card.removeCard();

    form.reset();

    mainMapPin.style.top = MAIN_MAP_PIN_DEFAULT_POSITION.top;
    mainMapPin.style.left = MAIN_MAP_PIN_DEFAULT_POSITION.left;

    window.utils.switchForm(formFieldsets, true);
    window.utils.switchForm(mapFiltersArray, true);
    window.utils.setAddressValue();

    mainMapPin.addEventListener(`mousedown`, onMainMapPinMouseDown);
    mainMapPin.addEventListener(`keydown`, onMainMapPinEnterPress);
  };

  window.page = {
    'deactivatePage': deactivatePage
  };
})();
