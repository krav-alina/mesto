const popup = document.querySelector('.popup');
const popupContainer = document.querySelector('.popup__container');
const editButton = document.querySelector('.profile__button_size_small');
const closeButton = document.querySelector('.popup__close');
const saveButton = document.querySelector('.popup__button');
const formElement = document.querySelector('.popup__form');
const titleElement = document.querySelector('.profile__title');
const typeElement = document.querySelector('.profile__subtitle');
const nameFieldElement = document.querySelector('.popup__input_name');
const typeFieldElement = document.querySelector('.popup__input_type');

editButton.addEventListener('click', function(){
    popup.classList.add('popup_isOpen');
    popupContainer.classList.add('popup__container_isOpen');
    nameFieldElement.value = titleElement.textContent;
    typeFieldElement.value = typeElement.textContent;
});

closeButton.addEventListener('click', function(){
    popup.classList.remove('popup_isOpen');
    popupContainer.classList.remove('popup__container_isOpen');
});

formElement.addEventListener('submit', function(event){
    event.preventDefault();
    titleElement.textContent = nameFieldElement.value;
    typeElement.textContent = typeFieldElement.value;
    popup.classList.remove('popup_isOpen');
    popupContainer.classList.remove('popup__container_isOpen');
});

