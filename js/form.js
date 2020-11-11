'use strict';

const form = document.querySelector(`.ad-form`);
const formReset = document.querySelector(`.ad-form__reset`);
const roomsSelect = document.querySelector(`#room_number`);
const guestsSelect = document.querySelector(`#capacity`);
const titleInput = document.querySelector(`#title`);
const priceInput = document.querySelector(`#price`);
const advertTypeSelect = document.querySelector(`#type`);
const timeInSelect = document.querySelector(`#timein`);
const timeOutSelect = document.querySelector(`#timeout`);
const URLUpload = `https://21.javascript.pages.academy/keksobooking`;
const avatarChooser = document.querySelector(`.ad-form-header__input`);
const avatarPreview = document.querySelector(`.ad-form-header__preview`);
const apartmentsPhotoChooser = document.querySelector(`.ad-form__upload .ad-form__input`);
const apartmentsPhotoPreview = document.querySelector(`.ad-form__photo`);

// Валидация поля ввода гостей и комнат

guestsSelect.addEventListener(`change`, window.validators.validateGuests);
roomsSelect.addEventListener(`change`, window.validators.validateGuests);

// Валидация заголовка

titleInput.addEventListener(`input`, window.validators.validateTitle);

// Валидация поля ввода цены

priceInput.addEventListener(`input`, window.validators.validatePrice);
advertTypeSelect.addEventListener(`change`, window.validators.validatePrice);

// Настройка времени выезда

timeInSelect.addEventListener(`change`, window.validators.tuneTimeOut);
timeOutSelect.addEventListener(`change`, window.validators.tuneTimeIn);

// Отправка формы

const onFormSubmit = (evt) => {
  window.server.request(new FormData(form), `POST`, URLUpload, window.success.show, window.error.show);
  evt.preventDefault();
};

form.addEventListener(`submit`, onFormSubmit);

// Обработчик для кнопки "очистить"

const onFormResetButtonClick = (evt) => {
  evt.preventDefault();
  window.page.deactivate();
};

formReset.addEventListener(`click`, onFormResetButtonClick);

// Показываем миниатюру для автара

const onAvatarChooserChange = () => window.image.showPreview(avatarChooser, avatarPreview);

avatarChooser.addEventListener(`change`, onAvatarChooserChange);

// Показываем миниатюру для фото жилья

const onApartmentsPhotoChooser = () => window.image.showPreview(apartmentsPhotoChooser, apartmentsPhotoPreview);

apartmentsPhotoChooser.addEventListener(`change`, onApartmentsPhotoChooser);


