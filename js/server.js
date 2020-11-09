'use strict';

const TIMEOUT_IN_MS = 10000;

const HTTP_STATUS = {
  'OK': 200,
  'badRequest': 400,
  'unauthorized': 401,
  'notFound': 404,
  'serverError': 500,
};

const request = (data, method, URL, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    let error;
    switch (xhr.status) {
      case HTTP_STATUS.OK:
        onSuccess(xhr.response);
        break;

      case HTTP_STATUS.badRequest:
        error = `Неверный запрос`;
        break;
      case HTTP_STATUS.unauthorized:
        error = `Пользователь не авторизован`;
        break;
      case HTTP_STATUS.notFound:
        error = `Ничего не найдено`;
        break;
      case HTTP_STATUS.serverError:
        error = `Внутренняя ошибка сервера`;
        break;

      default:
        error = `Статус ответа: ${xhr.status} ${xhr.statusText}`;
    }

    if (error) {
      onError(error);
    }
  });
  xhr.addEventListener(`error`, () => {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  xhr.open(method, URL);
  xhr.send(data);
};

window.server = {
  'request': request,
};
