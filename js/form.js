'use strict';

(function () {
  const form = document.querySelector(`.ad-form`);
  const formReset = document.querySelector(`.ad-form__reset`);
  const roomsSelect = document.querySelector(`#room_number`);
  const guestsSelect = document.querySelector(`#capacity`);
  const titleInput = document.querySelector(`#title`);
  const priceInput = document.querySelector(`#price`);
  const advertTypeSelect = document.querySelector(`#type`);
  const timeInSelect = document.querySelector(`#timein`);
  const timeOutSelect = document.querySelector(`#timeout`);

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

  form.addEventListener(`submit`, function (evt) {
    window.server.upload(new FormData(form), window.success.showSuccess, window.error.showError);
    evt.preventDefault();
  });

  // Обработчик для кнопки "очистить"

  const onFormResetButtonClick = (evt) => {
    evt.preventDefault();
    form.reset();
  };

  formReset.addEventListener(`click`, onFormResetButtonClick);

})();
