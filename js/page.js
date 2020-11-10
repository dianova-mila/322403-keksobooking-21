'use strict';

const MAIN_MAP_PIN_DEFAULT_POSITION = {
  'top': `375px`,
  'left': `570px`,
};
const map = document.querySelector(`.map`);
const mainMapPin = document.querySelector(`.map__pin--main`);
const form = document.querySelector(`.ad-form`);
const formFieldsets = form.querySelectorAll(`fieldset`);
const mapFilterForm = document.querySelector(`.map__filters`);
const mapFilters = mapFilterForm.children;
const URLLoad = `https://21.javascript.pages.academy/keksobooking/data`;
const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
const apartmentsPhotoPreview = document.querySelector(`.ad-form__photo`);

// Активировать страницу

const activatePage = () => {
  map.classList.remove(`map--faded`);
  form.classList.remove(`ad-form--disabled`);

  window.utils.switchForm(formFieldsets, false);
  window.server.request(``, `GET`, URLLoad, onSuccessLoad, window.error.show);

  mainMapPin.removeEventListener(`mousedown`, onMainMapPinMouseDown);
  mainMapPin.removeEventListener(`keydown`, onMainMapPinEnterPress);
};

const onSuccessLoad = (serverResponse) => {
  window.data.save(serverResponse);
  window.pins.render(window.data.get());

  window.utils.switchForm(mapFilters, false);
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

  window.pins.remove();
  window.card.remove();

  form.reset();
  mapFilterForm.reset();
  avatarPreview.src = `img/muffin-grey.svg`;
  apartmentsPhotoPreview.style.backgroundImage = `none`;

  mainMapPin.style.top = MAIN_MAP_PIN_DEFAULT_POSITION.top;
  mainMapPin.style.left = MAIN_MAP_PIN_DEFAULT_POSITION.left;

  window.utils.switchForm(formFieldsets, true);
  window.utils.switchForm(mapFilters, true);
  window.utils.setStartAddressValue();

  mainMapPin.addEventListener(`mousedown`, onMainMapPinMouseDown);
  mainMapPin.addEventListener(`keydown`, onMainMapPinEnterPress);
};

window.page = {
  'deactivate': deactivatePage
};
