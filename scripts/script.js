// Шаблоны
const addCardTemplate = document.querySelector('#template').content.querySelector('.elements__item');
const cardContainer = document.querySelector('.elements__list');

const buttonOpenEditUserProfile = document.querySelector('.profile__button');
const buttonOpenAddCard  = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAddcard = document.querySelector('.popup_type_add-card');
const popupOpenImage = document.querySelector('.popup_type_open-image');
const popupImage = popupOpenImage.querySelector('.popup__image');
const popupFigcaptionImage = popupOpenImage.querySelector('.popup__figcaption-image');

const buttonCloseEditUserProfile = document.querySelector('.popup__close_edit');
const buttonCloseAddCard = document.querySelector('.popup__close_add-button');
const buttonClosePopupImage  = document.querySelector('.popup__close_image-button');

const buttonSaveEditUserProfile = document.querySelector('.popup__save_edit');
const buttonSaveAddCard = document.querySelector('.popup__save_add-button');

// Находим форму в DOM
const formElement = document.querySelector('.popup__profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const formAddCard = document.querySelector('.popup__add-card');
const cardTitleInput = document.querySelector('.popup__title-card');
const cardLinkInput = document.querySelector('.popup__link-card');

 // Выберите элементы, куда должны быть вставлены значения полей
 const popupValueName = document.querySelector('.profile__title');
 const popupValueDescription = document.querySelector('.profile__text');

// обработчики событий карточек

// функция рендера карточки
const handleSubmitAddCard = (evt) => {
  evt.preventDefault();

  renderCards({ name: cardTitleInput.value, link: cardLinkInput.value });

  formAddCard.reset();

  disableSubmitButton(buttonSaveAddCard, validationConfig);
};

// функция удаление карточки
const deleteCard = (evt) => {
  evt.target.closest('.elements__item').remove();
}

// функция лайк карточки
const checkLike = (evt) => {
  evt.target.closest('.elements__like').classList.toggle('elements__like_checked');
}

// функция отрытия попапа с картинкой
const openFullImage = (cardData) => {
  popupImage.src = cardData.link;
  popupFigcaptionImage.textContent = cardData.name;
  openPopup(popupOpenImage);
}


// генерация карточки
const generateCard = (card) => {
  const newCard = addCardTemplate.cloneNode(true);

  const titleNewCard = newCard.querySelector('.elements__text');
  const linkNewCard = newCard.querySelector('.elements__image');

  titleNewCard.textContent = card.name;
  linkNewCard.src = card.link;
  linkNewCard.alt = titleNewCard.textContent;
  linkNewCard.addEventListener('click', () => openFullImage(card));

  const deleteButton = newCard.querySelector('.elements__delete');
  deleteButton.addEventListener('click', deleteCard);

  const checkLikeButton = newCard.querySelector('.elements__like');
  checkLikeButton.addEventListener('click', checkLike);

  return newCard;
};


// рендер карточки
const renderCards = (card) => {
  cardContainer.prepend(generateCard(card));
};
initialCards.forEach((card) => {
  renderCards(card);
});




// отрытие и закрытие popup
function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscClose);
}

function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscClose);
}

function closePopupOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    const openedPopup  = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// функционал, отвечающий за нажатие на ESC

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
   const openedPopup  = document.querySelector('.popup_opened');
   closePopup(openedPopup);
  }
 }

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function handleSubmitEditProfile(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

   // Вставьте новые значения с помощью textContent
  popupValueName.textContent = nameInput.value;
  popupValueDescription.textContent = jobInput.value;
}


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleSubmitEditProfile);
formAddCard.addEventListener('submit', handleSubmitAddCard);



// открытие, закрытие popup
buttonOpenEditUserProfile.addEventListener('click', () => openPopup(popupEdit));
buttonOpenAddCard.addEventListener('click', () => openPopup(popupAddcard));

buttonCloseEditUserProfile.addEventListener('click', () => closePopup(popupEdit));
buttonCloseAddCard.addEventListener('click', () => closePopup(popupAddcard));
buttonClosePopupImage.addEventListener('click', () => closePopup(popupOpenImage));

buttonSaveEditUserProfile.addEventListener('click', () => closePopup(popupEdit));
buttonSaveAddCard.addEventListener('click', () => closePopup(popupAddcard));


// import { enableValidation } from 'validate.js';
// buttonSaveAddCard.addEventListener('click', () => enableValidation(validationConfig));


popupEdit.addEventListener('click', closePopupOverlayClick);
popupAddcard.addEventListener('click', closePopupOverlayClick);
popupOpenImage.addEventListener('click', closePopupOverlayClick);













