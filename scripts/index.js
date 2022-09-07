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
//popup name 
const profilePopup = document.getElementById('popupName');
const profileEditButton = document.querySelector('.profile__button_size_small');
const profilePopupCloseButton = document.getElementById('closeButtonName');
const profileForm = document.getElementById('formName');
const titleElement = document.querySelector('.profile__title');
const typeElement = document.querySelector('.profile__subtitle');
const nameField = document.getElementById('personName-input');
const occupationField = document.getElementById('personOccupation-input');

//popup place
const placePopup = document.getElementById('popupPlace');
const placeAddButton = document.querySelector('.profile__button_size_big');
const placePopupCloseButton = document.getElementById('closeButtonPlace');
const picNameField = document.getElementById('picName-input');
const picURLField = document.getElementById('picURL-input');
const cardsContainer = document.querySelector('.photo-grid');
const placeForm = document.getElementById('formPlace');

//popup Pic
const picturePopup = document.getElementById('popupPic');
const pic = document.querySelector('.popup__photo');
const picturePopupCloseButton = document.getElementById('closeButtonPic');
const picTitle = document.querySelector('.popup__title_color_white');
const itemTemplate = document.querySelector('#item').content;
const placeGrid = document.querySelector('.photo-grid');


function openPopup (popup) {
  popup.classList.add('popup_open');
}; 

function closePopup (popup) {
    popup.classList.remove('popup_open');
};  

function closePopupFull (button, popup) {
  button.addEventListener('click', function(){
    closePopup (popup);
  });
};

profileEditButton.addEventListener('click', function(){
  openPopup (profilePopup);
  nameField.value = titleElement.textContent;
  occupationField.value = typeElement.textContent;
});

placeAddButton.addEventListener('click', function(){
  openPopup (placePopup);
  picNameField.value = '';
  picURLField.value = '';
});

profilePopupCloseButton.addEventListener('click', function(){
  closePopup (profilePopup);
});

placePopupCloseButton.addEventListener('click', function(){
  closePopup (placePopup);
});

picturePopupCloseButton.addEventListener('click', function(){
  closePopup (picturePopup);
});

profileForm.addEventListener('submit', function(event){
    event.preventDefault();
    titleElement.textContent = nameField.value;
    typeElement.textContent = occupationField.value;
    closePopup (profilePopup);
});


function createCard (titleValue, picValue) {
  const placeContainer = itemTemplate.querySelector('.photo-grid__item').cloneNode(true);
  const placeContainerPicture = placeContainer.querySelector('.photo-grid__photo-image');
  placeContainerPicture.src = picValue;
  placeContainerPicture.alt = picValue;
  const rectangleElement = placeContainer.querySelector('.photo-grid__rectangle');
  let titleElement = rectangleElement.querySelector('.photo-grid__title');
  titleElement.textContent = titleValue;
  rectangleElement.querySelector('.photo-grid__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('photo-grid__heart_active');
  }); 
  const basketButton = placeContainer.querySelector('.photo-grid__basket');
  basketButton.addEventListener ('click', function(evt) {
    const basket = evt.target.closest('.photo-grid__item');
    basket.remove();
  });
  placeContainerPicture.addEventListener ('click', function(evt) {
    openPopup (picturePopup);
    pic.src = evt.target.src;
    pic.alt = titleValue;
    picTitle.textContent = titleValue;
  });
  return placeContainer;
}

initialCards.forEach (function(item){
  const card = createCard(item.name, item.link);
  placeGrid.append(card);
});

placeForm.addEventListener('submit', function(event){
  event.preventDefault();
  const card = createCard(picNameField.value, picURLField.value);
  cardsContainer.prepend(card);
  closePopup (placePopup);
});





const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input-error');
  errorElement.textContent = errorMessage;
  //errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input-error');
  //errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button_disabled');
  } else {
    buttonElement.classList.remove('popup__button_disabled');
  }
}; 

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const popupSaveButton = formElement.querySelector('.popup__button');
  toggleButtonState (inputList, popupSaveButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState (inputList, popupSaveButton);
    });
  });
};

const enableValidation = () =>{
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement)=>{
    formElement.addEventListener('submit', function (evt){
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

enableValidation();


