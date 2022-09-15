const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error'
}


const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error');
  errorElement.textContent = '';
};

const hideErrorInInput = (popupElement) => {
  const inputList = Array.from(popupElement.querySelectorAll('.popup__input'));
  inputList.forEach((inputElement) => {
    hideInputError (popupElement.querySelector('.popup__form'), inputElement);
  });
}

const checkEscKey = (evt) => {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement)=>{
    if (popupElement.classList.contains('popup_open')) {
      if (evt.key == 'Escape') {
        hideErrorInInput(popupElement);
        closePopup (popupElement);
      };
    };  
  });
}


const enableClosure = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement)=>{
    popupElement.querySelector('.popup__close-button').addEventListener('click', function(){
      hideErrorInInput(popupElement);
      closePopup (popupElement);
    });
    document.addEventListener('keydown', checkEscKey);
    popupElement.addEventListener('click',function(evt){
      const isClosest = evt.target.closest('.popup__container');
      if (!isClosest && (popupElement.classList.contains('popup_open'))) {
        hideErrorInInput(popupElement);
        closePopup (popupElement);
      };
    });
  });
};

enableClosure();

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}; 

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const popupSaveButton = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState (inputList, popupSaveButton, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState (inputList, popupSaveButton, config);
    });
  });
};

const enableValidation = (config) =>{
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement)=>{
    formElement.addEventListener('submit', function (evt){
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
}

enableValidation(validationConfig);




