'use strict';

(() => {
  const successPopupTemplate = document.querySelector(`#success`)
    .content
    .querySelector(`.success`);
  const container = document.querySelector(`main`);

  // Показать сообщение об удачной отправке данных

  const showSuccess = () => {
    let successPopup = successPopupTemplate.cloneNode(true);

    container.appendChild(successPopup);

    const closeSuccessPopup = () => {
      document.querySelector(`.success`).remove();

      document.removeEventListener(`click`, onSuccessPopupClick);
      document.removeEventListener(`keydown`, onSuccessPopupEscPress);

      window.page.deactivate();
    };

    const onSuccessPopupClick = (evt) => {
      evt.preventDefault();
      closeSuccessPopup();
    };

    const onSuccessPopupEscPress = (evt) => {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        closeSuccessPopup();
      }
    };

    document.addEventListener(`click`, onSuccessPopupClick);
    document.addEventListener(`keydown`, onSuccessPopupEscPress);
  };

  window.success = {
    'show': showSuccess,
  };
})();
