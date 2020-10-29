'use strict';

(function () {
  const errorPopupTemplate = document.querySelector(`#success`)
    .content
    .querySelector(`.success`);

  // Показать сообщение об удачной отправке данных

  const showSuccess = () => {
    let successPopup = errorPopupTemplate.cloneNode(true);

    document.body.appendChild(successPopup);

    const closeSuccessPopup = () => {
      document.querySelector(`.success`).remove();

      document.removeEventListener(`click`, onSuccessPopupClick);
      document.removeEventListener(`keydown`, onSuccessPopupEscPress);

      window.page.deactivatePage();
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
    'showSuccess': showSuccess,
  };
})();
