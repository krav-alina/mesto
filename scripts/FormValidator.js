
export class FormValidator {
  constructor(formElement, config) {
    this._formElement = formElement;
    this._config = config;
  }


  _showInputError (inputElement, errorMessage) {
    
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };
  
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity (inputElement, errorMessage) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
  
  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
  
  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  }; 
  
  _setEventListeners () {
    
    const inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    const popupSaveButton = this._formElement.querySelector(this._config.submitButtonSelector);
    this._toggleButtonState (inputList, popupSaveButton);
    // проблема ниже
    inputList.forEach((inputElement) => {
      
      inputElement.addEventListener('input', () => {
        //console.log(this._formElement);
        this._checkInputValidity(inputElement, inputElement.validationMessage);
        this._toggleButtonState (inputList, popupSaveButton);
      });
    });
  };
  
  enableValidation () {
    this._formElement.addEventListener('submit', function (evt){
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
