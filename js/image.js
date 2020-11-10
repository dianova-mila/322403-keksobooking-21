'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const showImagePreview = (source, target) => {
  const file = source.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, function () {
      if (target.querySelector(`img`)) {
        target.querySelector(`img`).src = `${reader.result}`;
      } else {
        target.style.backgroundImage = `url(${reader.result})`;
        target.style.backgroundSize = `100% 100%`;
        target.style.backgroundRepeat = `no-repeat`;
      }
    });

    reader.readAsDataURL(file);
  }
};

window.image = {
  'showPreview': showImagePreview,
};
