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

const popupName = document.getElementById('popupName');
const popupPlace = document.getElementById('popupPlace');
const editButtonSmall = document.querySelector('.profile__button_size_small');
const editButtonBig = document.querySelector('.profile__button_size_big');
const closeButton = document.querySelector('.popup__close-button');
const saveButton = document.querySelector('.popup__button');
const formElement = document.querySelector('.popup__form');
const titleElement = document.querySelector('.profile__title');
const typeElement = document.querySelector('.profile__subtitle');
const nameFieldElement = document.querySelector('.popup__input_type_name');
const typeFieldElement = document.querySelector('.popup__input_type_occupation');

editButtonSmall.addEventListener('click', function(){
    popupName.classList.add('popup_open');
    nameFieldElement.value = titleElement.textContent;
    typeFieldElement.value = typeElement.textContent;
});

function button (button, popup) {
    button.addEventListener('click', function(){
        popup.classList.remove('popup_open');
    });
};  

button (closeButton, popupName);
//closeButton.addEventListener('click', function(){
 //   popupName.classList.remove('popup_open');
//});
formElement.addEventListener('submit', function(event){
    event.preventDefault();
    titleElement.textContent = nameFieldElement.value;
    typeElement.textContent = typeFieldElement.value;
    popupName.classList.remove('popup_open');
});

editButtonBig.addEventListener('click', function(){
    popupPlace.classList.add('popup_open');
    nameFieldElement.value = titleElement.textContent;
    typeFieldElement.value = typeElement.textContent;
});

