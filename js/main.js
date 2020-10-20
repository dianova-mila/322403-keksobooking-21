'use strict';

const ADVERT_TITLES = [
  `Уютная квартира на окраине`,
  `Чулан под лестницей`,
  `Нора хоббита`,
  `Трейлер в парке`,
  `Подсобка в книжном`,
  `Дом на дереве`,
  `Апартаменты в центре`,
  `Ходячий замок`
];
const ADVERT_PRICES = [2500, 4000, 3400, 5800, 6000, 1400, 9000, 3400];
const ADVERT_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const ADVERT_TIMES = [`12:00`, `13:00`, `14:00`];
const ADVERT_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const ADVERT_DESCRIPTIONS = [
  `Уютное гнездышко`,
  `Не обязательно быть избранным`,
  `Для невысоких`,
  `Душ на улице`,
  `Для интеллектуалов`,
  `Вспомни детство`,
  `Громко, тесно, зато рядом метро!`,
  `Держись крепче!`
];
const ADVERT_PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
const ADVERTS_COUNT = 8;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;

const MAIN_PIN_WIDTH = 62;
const MAIN_PIN_HEIGHT = 84;

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const map = document.querySelector(`.map`);
const mainMapPin = document.querySelector(`.map__pin--main`);
const mapFilters = document.querySelector(`.map__filters`);
const mapFiltersArray = mapFilters.children;
const pinContainer = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

const form = document.querySelector(`.ad-form`);
const formFieldsets = form.querySelectorAll(`fieldset`);
const addressInput = document.querySelector(`#address`);
const roomsSelect = document.querySelector(`#room_number`);
const guestsSelect = document.querySelector(`#capacity`);
const titleInput = document.querySelector(`#title`);
const priceInput = document.querySelector(`#price`);
const advertTypeSelect = document.querySelector(`#type`);
const timeInSelect = document.querySelector(`#timein`);
const timeOutSelect = document.querySelector(`#timeout`);

const advertCardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);
const filters = document.querySelector(`.map__filters-container`);

// Страница неактивна
const switchForm = (formArray, disable) => {
  for (let element of formArray) {
    element.disabled = disable;
  }
};

const setAddressValue = () => {
  let mainMapPinX = parseInt(getComputedStyle(mainMapPin).left, 10) + (MAIN_PIN_WIDTH / 2);
  let mainMapPinY = parseInt(getComputedStyle(mainMapPin).top, 10) + MAIN_PIN_HEIGHT;
  addressInput.value = `${mainMapPinX}, ${mainMapPinY}`;
};

switchForm(formFieldsets, true);
switchForm(mapFiltersArray, true);
setAddressValue();

// Активация страницы

const activatePage = () => {
  map.classList.remove(`map--faded`);
  form.classList.remove(`ad-form--disabled`);

  switchForm(formFieldsets, false);
  switchForm(mapFiltersArray, false);
  renderPins(advertsArray);

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

mainMapPin.addEventListener(`mousedown`, (evt) => {
  if (evt.button === 0) {
    setAddressValue();
  }
});

// Валидация

// Валидация поля ввода гостей и комнат

const validateGuests = () => {
  const guestCount = parseInt(guestsSelect.value, 10);
  switch (roomsSelect.value) {
    case `1`:
      if (guestCount !== 1) {
        guestsSelect.setCustomValidity(`Одна комната только для одного гостя`);
      } else {
        guestsSelect.setCustomValidity(``);
      }
      break;
    case `2`:
      if (guestCount < 1 || guestCount > 2) {
        guestsSelect.setCustomValidity(`Две комнаты только для одного или двух гостей`);
      } else {
        guestsSelect.setCustomValidity(``);
      }
      break;
    case `3`:
      if (guestCount < 1 || guestCount > 3) {
        guestsSelect.setCustomValidity(`Три комнаты только для 1-3 гостей`);
      } else {
        guestsSelect.setCustomValidity(``);
      }
      break;
    case `100`:
      if (guestCount !== 0) {
        guestsSelect.setCustomValidity(`100 комнат не для гостей`);
      } else {
        guestsSelect.setCustomValidity(``);
      }
      break;
  }

  guestsSelect.reportValidity();
};

guestsSelect.addEventListener(`change`, validateGuests);
roomsSelect.addEventListener(`change`, validateGuests);

// Валидация заголовка

const validateTitle = () => {
  const titleLength = titleInput.value.length;

  if (titleLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - titleLength} симв.`);
  } else if (titleLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${titleLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    titleInput.setCustomValidity(``);
  }

  titleInput.reportValidity();
};

titleInput.addEventListener(`input`, validateTitle);

// Валидация поля ввода цены

const validatePrice = () => {
  const priceValue = parseInt(priceInput.value, 10);
  switch (advertTypeSelect.value) {
    case `bungalow`:
      priceInput.setAttribute(`placeholder`, `500`);
      priceInput.setAttribute(`min`, `0`);
      if (priceValue > 100000) {
        priceInput.setCustomValidity(`Цена не может быть больше 100000 за ночь`);
      } else {
        priceInput.setCustomValidity(``);
      }
      break;
    case `flat`:
      priceInput.setAttribute(`placeholder`, `1000`);
      priceInput.setAttribute(`min`, `1000`);
      if (priceValue > 100000 || priceValue < 1000) {
        priceInput.setCustomValidity(`Цена за квартиру не может быть меньше 1000 и больше 100000 за ночь`);
      } else {
        priceInput.setCustomValidity(``);
      }
      break;
    case `house`:
      priceInput.setAttribute(`placeholder`, `5000`);
      priceInput.setAttribute(`min`, `5000`);
      if (priceValue > 100000 || priceValue < 5000) {
        priceInput.setCustomValidity(`Цена за дом не может быть меньше 5000 и больше 100000 за ночь`);
      } else {
        priceInput.setCustomValidity(``);
      }
      break;
    case `palace`:
      priceInput.setAttribute(`placeholder`, `10000`);
      priceInput.setAttribute(`min`, `10000`);
      if (priceValue > 100000 || priceValue < 10000) {
        priceInput.setCustomValidity(`Цена за дворец не может быть меньше 10000 и больше 100000 за ночь`);
      } else {
        priceInput.setCustomValidity(``);
      }
      break;
  }

  priceInput.reportValidity();
};

priceInput.addEventListener(`input`, validatePrice);
advertTypeSelect.addEventListener(`change`, validatePrice);

// Настройка времени выезда

const tuneTimeOut = () => {
  timeOutSelect.value = timeInSelect.value;
};

const tuneTimeIn = () => {
  timeInSelect.value = timeOutSelect.value;
};

timeInSelect.addEventListener(`change`, tuneTimeOut);
timeOutSelect.addEventListener(`change`, tuneTimeIn);

// Создание массива объявлений

const getRandomItemFromArray = (array) => array[Math.floor(Math.random() * array.length)];

const getRandomNumber = (minValue, maxValue) => minValue + Math.floor(Math.random() * (maxValue + 1 - minValue));

const getArrayRandomLength = (array) => array.slice(0, getRandomNumber(1, (array.length - 1)));

const getAdvert = (advertId) => {
  const locationX = getRandomNumber(0, 1200);
  const locationY = getRandomNumber(130, 630);

  return {
    author: {
      avatar: `img/avatars/user0${advertId + 1}.png`
    },
    offer: {
      title: ADVERT_TITLES[advertId],
      address: `${locationX}, ${locationY}`,
      price: ADVERT_PRICES[advertId],
      type: getRandomItemFromArray(ADVERT_TYPES),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 10),
      checkin: getRandomItemFromArray(ADVERT_TIMES),
      checkout: getRandomItemFromArray(ADVERT_TIMES),
      features: getArrayRandomLength(ADVERT_FEATURES),
      description: ADVERT_DESCRIPTIONS[advertId],
      photos: getArrayRandomLength(ADVERT_PHOTOS)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
};

const getAdvertsArray = () => {
  let advertsArray = [];

  for (let i = 0; i < ADVERTS_COUNT; i++) {
    const advert = getAdvert(i);
    advertsArray.push(advert);
  }

  return advertsArray;
};

const advertsArray = getAdvertsArray();

// Рендер пинов

const createPin = (advert) => {
  let pin = pinTemplate.cloneNode(true);

  pin.style.left = `${advert.location.x - PIN_WIDTH / 2}px`;
  pin.style.top = `${advert.location.y - PIN_HEIGHT}px`;

  let pinImage = pin.querySelector(`img`);
  pinImage.src = advert.author.avatar;
  pinImage.alt = advert.offer.title;

  return pin;
};

const renderPins = (adverts) => {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < adverts.length; i++) {
    const pin = createPin(adverts[i]);
    pin.dataset.advertId = `${i}`;
    fragment.appendChild(pin);
  }

  pinContainer.appendChild(fragment);
};

// Рендер карточек

const getCardType = (advertType) => {
  let advertCardType;
  switch (advertType) {
    case `flat`:
      advertCardType = `Квартира`;
      break;
    case `bungalow`:
      advertCardType = `Бунгало`;
      break;
    case `house`:
      advertCardType = `Дом`;
      break;
    case `palace`:
      advertCardType = `Дворец`;
      break;
  }
  return advertCardType;
};

const createAdvertCard = (advert) => {
  let advertCard = advertCardTemplate.cloneNode(true);

  advertCard.querySelector(`.popup__avatar`).src = advert.author.avatar;
  advertCard.querySelector(`.popup__title`).textContent = advert.offer.title;
  advertCard.querySelector(`.popup__text--address`).textContent = advert.offer.address;
  advertCard.querySelector(`.popup__text--price`).textContent = `${advert.offer.price}₽/ночь`;
  advertCard.querySelector(`.popup__text--capacity`).textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests}`;
  advertCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  advertCard.querySelector(`.popup__description`).textContent = advert.offer.description;
  advertCard.querySelector(`.popup__type`).textContent = getCardType(advert.offer.type);

  let advertCardFeatures = advertCard.querySelector(`.popup__features`);
  let advertCardFeaturesList = advertCard.querySelectorAll(`.popup__feature`);
  let advertCardFeature = advertCard.querySelector(`.popup__feature--wifi`).cloneNode(true);
  advertCardFeature.classList.remove(`popup__feature--wifi`);

  for (let i = 0; i < advertCardFeaturesList.length; i++) {
    advertCardFeaturesList[i].remove();
  }
  for (let i = 0; i < advert.offer.features.length; i++) {
    let advertCardFeatureClone = advertCardFeature.cloneNode(true);
    advertCardFeatureClone.classList.add(`popup__feature--${advert.offer.features[i]}`);
    advertCardFeatures.appendChild(advertCardFeatureClone);
  }

  let advertCardPhotos = advertCard.querySelector(`.popup__photos`);
  let advertCardPhoto = advertCardPhotos.querySelector(`.popup__photo`).cloneNode(true);
  advertCardPhotos.querySelector(`.popup__photo`).remove();
  for (let i = 0; i < advert.offer.photos.length; i++) {
    advertCardPhoto.src = advert.offer.photos[i];
    advertCardPhotos.appendChild(advertCardPhoto);
  }

  return advertCard;
};

const renderCard = (adverts) => {
  if (map.querySelector(`.map__card`)) {
    map.querySelector(`.map__card`).remove();
    const advertCard = createAdvertCard(adverts);
    map.insertBefore(advertCard, filters);
  } else {
    const advertCard = createAdvertCard(adverts);
    map.insertBefore(advertCard, filters);
  }
};

const onMapPinClick = (evt) => {
  if (evt.target.closest(`.map__pin`) && !evt.target.closest(`.map__pin--main`)) {
    const advertId = evt.target.closest(`.map__pin`).dataset.advertId;
    renderCard(advertsArray[advertId]);

    const mapCloseButton = map.querySelector(`.popup__close`);
    mapCloseButton.addEventListener(`click`, onMapCloseButtonClick);
    map.addEventListener(`keydown`, onMapCloseButtonEscPress);
  }
};

const onMapPinEnterPress = (evt) => {
  if (evt.key === `Enter` &&
    evt.target.closest(`.map__pin`) &&
    !evt.target.closest(`.map__pin--main`)) {
    const advertId = evt.target.closest(`.map__pin`).dataset.advertId;
    renderCard(advertsArray[advertId]);
  }
};

map.addEventListener(`click`, onMapPinClick);
map.addEventListener(`keydown`, onMapPinEnterPress);

const closeCard = () => map.querySelector(`.map__card`).remove();

const onMapCloseButtonClick = (evt) => {
  evt.preventDefault();
  closeCard();
};

const onMapCloseButtonEscPress = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeCard();
  }
};
