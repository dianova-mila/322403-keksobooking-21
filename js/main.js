'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const mainMapPin = document.querySelector(`.map__pin--main`);
  const mapFilters = document.querySelector(`.map__filters`);
  const mapFiltersArray = mapFilters.children;

  const form = document.querySelector(`.ad-form`);
  const formFieldsets = form.querySelectorAll(`fieldset`);


  // Страница неактивна

  window.utils.switchForm(formFieldsets, true);
  window.utils.switchForm(mapFiltersArray, true);
  window.utils.setAddressValue();

  // Активация страницы

  const activatePage = () => {
    map.classList.remove(`map--faded`);
    form.classList.remove(`ad-form--disabled`);

    window.utils.switchForm(formFieldsets, false);
    window.utils.switchForm(mapFiltersArray, false);
    window.pins.renderPins(window.data.advertsArray);

    mainMapPin.removeEventListener(`mousedown`, onMainMapPinMouseDown);
    mainMapPin.removeEventListener(`keydown`, onMainMapPinEnterPress);
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

  mainMapPin.addEventListener(`mousedown`, onMainMapPinMouseDown);
  mainMapPin.addEventListener(`keydown`, onMainMapPinEnterPress);
})();
