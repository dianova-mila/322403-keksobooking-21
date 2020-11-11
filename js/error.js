'use strict';

const errorPopupTemplate = document.querySelector(`#error`)
  .content
  .querySelector(`.error`);
const container = document.querySelector(`main`);

// Показать сообщение об ошибке

const showError = (errorMessage) => {
  let errorPopup = errorPopupTemplate.cloneNode(true);
  errorPopup.querySelector(`.error__message`).textContent = errorMessage;

  container.appendChild(errorPopup);

  const errorCloseButton = errorPopup.querySelector(`.error__button`);

  const onErrorCloseButtonClick = (evt) => {
    evt.preventDefault();
    errorPopupClose();
  };

  const onErrorPopupEscPress = (evt) => {
    evt.preventDefault();
    if (evt.key === `Escape`) {
      errorPopupClose();
    }
  };

  errorCloseButton.addEventListener(`click`, onErrorCloseButtonClick);
  document.addEventListener(`keydown`, onErrorPopupEscPress);

  const errorPopupClose = () => {
    document.querySelector(`.error`).remove();

    document.removeEventListener(`keydown`, onErrorPopupEscPress);
  };
};

window.error = {
  'show': showError,
};
