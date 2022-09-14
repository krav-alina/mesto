const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error');
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

const enableClosure = () => {
  const popupList = Array.from(document.querySelectorAll('.popup'));
  popupList.forEach((popupElement)=>{
    popupElement.querySelector('.popup__close-button').addEventListener('click', function(){
      hideErrorInInput(popupElement);
      closePopup (popupElement);
    });
    document.addEventListener('keydown',function(evt){
      if (evt.key == 'Escape') {
        hideErrorInInput(popupElement);
        closePopup (popupElement);
      };
    });
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


