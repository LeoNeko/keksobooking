'use strict';

// Показывает скрытый блок карты
var userDialog = document.querySelector('.map');

var pinStart = document.querySelector('.map__pin--main');
var formElement = document.querySelector('.notice__form');
var formFieldsets = document.getElementsByClassName('form__element');
var form = document.querySelector('.notice__form');
window.fieldsetsToggle(formFieldsets);

/*
* Собитие на плашке
* Отпустить нажатие мышки
*
*/
var onError = function (message) {
  console.error(message);
};

var onSuccess = function (data) {
  console.log(data);
};

function activeSitePageHandle() {
  userDialog.classList.remove('map--faded'); // Убрать затемнение с карты
  formElement.classList.remove('notice__form--disabled'); // Убрать затемнение с карты формы
  var filterPanel = document.querySelector('.map__filters');
  window.fieldsetsToggle(formFieldsets);

  // отрисовка плашек похожих объявлений
  // similarListElement.appendChild(fragment);

  // Загрузка данных с сервера
  window.backend.load(onSuccess, onError);

  pinStart.removeEventListener('mouseup', activeSitePageHandle);

  // Вешается обработчик фильтров
  filterPanel.addEventListener('change', window.filtersChangeHandler);
}


pinStart.addEventListener('mouseup', activeSitePageHandle);

/*
* Слушает отправку формы, сбрасывает действия по умолчанию и делает то что надо
*
*/
form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  window.backend.save(new FormData(form), function () {
    userDialog.classList.add('hidden');
  }, window.backend.errorHandler);
  form.reset();
});


