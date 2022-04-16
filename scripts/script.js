const OpenPopupButton = document.querySelector('.profile__button');
const popup = document.querySelector('.popup');
const ClosePopupButton = popup.querySelector('.popup__close');
const SavepopupButton = popup.querySelector('.popup__save');

// добавить, убрать класс для popup
function popupOpenToggle() {
  popup.classList.toggle('popup_opened');
}

// открытие, закрытие popup
OpenPopupButton.addEventListener('click', popupOpenToggle);
ClosePopupButton.addEventListener('click', popupOpenToggle);
SavepopupButton.addEventListener('click', popupOpenToggle);

// Находим форму в DOM
let formElement = document.querySelector('.Profile');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__name');// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__description');// Воспользуйтесь инструментом .querySelector()
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

 // Получите значение полей jobInput и nameInput из свойства value
    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей
    let popupValueName = document.querySelector('.profile__title');
    let popupValueDescription = document.querySelector('.profile__text');

    // Вставьте новые значения с помощью textContent
    popupValueName.textContent = nameInputValue;
    popupValueDescription.textContent = jobInputValue;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

