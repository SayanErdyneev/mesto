// массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

// Шаблоны
const addCardTemplate = document.querySelector('#template').content.querySelector('.elements__item');
const cardContainer = document.querySelector('.elements__list'); // контейнер

// обработчики событий карточек

// функция рендера карточки
const handleSubmitAddCard = (evt) => {
  evt.preventDefault();

  renderCards({ name: cardTitleInput.value, link: cardLinkInput.value });

  cardTitleInput.value = '';
  cardLinkInput.value = '';
};

// функция удаление карточки
const deleteCard = (evt) => {
  evt.target.closest('.elements__item').remove();
}

// функция лайк карточки
const checkLike = (evt) => {
  evt.target.closest('.elements__like').classList.toggle('elements__like_checked');
}


// генерация карточки
const generateToDoCard = (card) => {
  const newCard = addCardTemplate.cloneNode(true);

  const titleNewCard = newCard.querySelector('.elements__text');
  const linkNewCard = newCard.querySelector('.elements__image');

  titleNewCard.textContent = card.name;
  linkNewCard.src = card.link;

  const deleteButton = newCard.querySelector('.elements__delete');
  deleteButton.addEventListener('click', deleteCard);

  const checkLikeButton = newCard.querySelector('.elements__like');
  checkLikeButton.addEventListener('click', checkLike);

  return newCard;
};

// рендер карточки
const renderCards = (card) => {
  cardContainer.prepend(generateToDoCard(card));
};

initialCards.forEach((card) => {
  renderCards(card);
});

const openPopupEditButton = document.querySelector('.profile__button');
const openPopupAddButton = document.querySelector('.profile__addbutton');

// const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddcard = document.querySelector('.popup_type_addcard');

const closePopupEditButton = document.querySelector('.popup__close_edit');
const closePopupAddButton = document.querySelector('.popup__close_addbutton');

const savePopupEditButton = document.querySelector('.popup__save_edit');
const savePopupAddButton = document.querySelector('.popup__save_addbutton');

// Находим форму в DOM
const formElement = document.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__description');

const formAddCard = document.querySelector('.popup__form_addCard');
const cardTitleInput = document.querySelector('.popup__title-card');
const cardLinkInput = document.querySelector('.popup__link-card');

// отрытие и закрытие popup
function popupOpen(item) {
  item.classList.add('popup_opened');
}

function popupClose(item) {
  item.classList.remove('popup_opened');
}

function popupOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    popupClose(popupEdit);
    popupClose(popupAddcard);
  }
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function formSubmitHandler(evt) {
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

  nameInput.value = '';
  jobInput.value = '';
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
formAddCard.addEventListener('submit', handleSubmitAddCard);

// открытие, закрытие popup
openPopupEditButton.addEventListener('click', () => popupOpen(popupEdit));
openPopupAddButton.addEventListener('click', () => popupOpen(popupAddcard));

closePopupEditButton.addEventListener('click', () => popupClose(popupEdit));
closePopupAddButton.addEventListener('click', () => popupClose(popupAddcard));

// savePopupEditButton.addEventListener('click', () => popupClose(popupEdit));
// savePopupAddButton.addEventListener('click', () => popupClose(popupAddcard));

// popupEdit.addEventListener('click', popupOverlayClick);
// popupAddcard.addEventListener('click', popupOverlayClick);


// Открытие попапа с картинкой
// Плавное открытие и закрытие попапов
