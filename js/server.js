'use strict';

const TIMEOUT_IN_MS = 10000;

const StatusCode = {
  'OK': 200,
  'BAD_REQUEST': 400,
  'UNAUTHORIZED': 401,
  'NOT_FOUND': 404,
  'SERVER_ERROR': 500,
};

const request = (data, method, URL, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  const onXhrLoad = () => {
    let error;
    switch (xhr.status) {
      case StatusCode.OK:
        onSuccess(xhr.response);
        break;

      case StatusCode.BAD_REQUEST:
        error = `Неверный запрос`;
        break;
      case StatusCode.UNAUTHORIZED:
        error = `Пользователь не авторизован`;
        break;
      case StatusCode.NOT_FOUND:
        error = `Ничего не найдено`;
        break;
      case StatusCode.SERVER_ERROR:
        error = `Внутренняя ошибка сервера`;
        break;

      default:
        error = `Статус ответа: ${xhr.status} ${xhr.statusText}`;
    }

    if (error) {
      onError(error);
    }
  };

  const onXhrError = () => {
    onError(`Произошла ошибка соединения`);
  };

  const onXhrTimeout = () => {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  };

  xhr.addEventListener(`load`, onXhrLoad);
  xhr.addEventListener(`error`, onXhrError);
  xhr.addEventListener(`timeout`, onXhrTimeout);

  xhr.timeout = TIMEOUT_IN_MS;

  xhr.open(method, URL);
  xhr.send(data);
};

window.server = {
  'request': request,
};
