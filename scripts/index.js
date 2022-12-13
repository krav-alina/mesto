import { Card } from "./Card.js"
import { FormValidator } from "./FormValidator.js"

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
}

//popup name 
const profilePopup = document.getElementById('popupName');
const profileEditButton = document.querySelector('.profile__button_size_small');
const profileForm = document.getElementById('formName');
const titleElement = document.querySelector('.profile__title');
const typeElement = document.querySelector('.profile__subtitle');
const nameField = document.getElementById('personName-input');
const occupationField = document.getElementById('personOccupation-input');

//popup place
const placePopup = document.getElementById('popupPlace');
const placeAddButton = document.querySelector('.profile__button_size_big');
const picNameField = document.getElementById('picName-input');
const picURLField = document.getElementById('picURL-input');
const cardsContainer = document.querySelector('.photo-grid');
const placeForm = document.getElementById('formPlace');
const nameForm = document.getElementById('formName');

//popup Pic
const picturePopup = document.getElementById('popupPic');
const pic = document.querySelector('.popup__photo');
const picTitle = document.querySelector('.popup__title_color_white');
const itemTemplate = document.querySelector('#item').content;
//const placeGrid = document.querySelector('.photo-grid');

function openPopup (popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', checkEscKey);
}; 

function closePopup (popup) {
    popup.classList.remove('popup_open');
    document.removeEventListener('keydown', checkEscKey);
};  

function hideInputError (form, inputElement) {
  const errorElement = form.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error');
  errorElement.textContent = '';
};


profileEditButton.addEventListener('click', function(){
  openPopup (profilePopup);
  nameField.value = titleElement.textContent;
  occupationField.value = typeElement.textContent;
  profilePopup.querySelector('.popup__button').classList.add('popup__button_disabled');
  const inputList = Array.from(profilePopup.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    hideInputError (nameForm, inputElement);
  });
});

placeAddButton.addEventListener('click', function(){
  openPopup (placePopup);
  picNameField.value = '';
  picURLField.value = '';
  placePopup.querySelector('.popup__button').classList.add('popup__button_disabled');
  const inputList = Array.from(placePopup.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    hideInputError (placeForm, inputElement);
  });
});

profileForm.addEventListener('submit', function(event){
    event.preventDefault();
    titleElement.textContent = nameField.value;
    typeElement.textContent = occupationField.value;
    closePopup (profilePopup);
});

const checkEscKey = (evt) => {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement)=>{
    if (popupElement.classList.contains('popup_open')) {
      if (evt.key == 'Escape') {
        closePopup (popupElement);
      };
    };  
  });
}

const enableClosure = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement)=>{
    popupElement.querySelector('.popup__close-button').addEventListener('click', function(){
      closePopup (popupElement);
    });
    document.addEventListener('keydown', checkEscKey);
    popupElement.addEventListener('click',function(evt){
      const isClosest = evt.target.closest('.popup__container');
      if (!isClosest && (popupElement.classList.contains('popup_open'))) {
        closePopup (popupElement);
      };
    });
  });
};

enableClosure();

initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, '#item');
  const cardElement = card.generateCard();
  document.querySelector('.photo-grid').append(cardElement);
});

placeForm.addEventListener('submit', function(event){
  event.preventDefault();
  const card = new Card(picNameField.value, picURLField.value, '#item');
  const cardElement = card.generateCard();
  document.querySelector('.photo-grid').prepend(cardElement);
  closePopup (placePopup);
});

const placeFormVal = new FormValidator(placeForm, validationConfig);
placeFormVal.enableValidation();

const nameFormVal = new FormValidator(nameForm, validationConfig);
nameFormVal.enableValidation();



