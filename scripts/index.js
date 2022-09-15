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

//popup Pic
const picturePopup = document.getElementById('popupPic');
const pic = document.querySelector('.popup__photo');
const picTitle = document.querySelector('.popup__title_color_white');
const itemTemplate = document.querySelector('#item').content;
const placeGrid = document.querySelector('.photo-grid');


function openPopup (popup) {
  popup.classList.add('popup_open');
}; 

function closePopup (popup) {
    popup.classList.remove('popup_open');
};  


profileEditButton.addEventListener('click', function(){
  openPopup (profilePopup);
  document.addEventListener('keydown', checkEscKey);
  nameField.value = titleElement.textContent;
  occupationField.value = typeElement.textContent;
  hideErrorInInput(profilePopup,validationConfig);
});

placeAddButton.addEventListener('click', function(){
  openPopup (placePopup);
  document.addEventListener('keydown', checkEscKey);
  picNameField.value = '';
  picURLField.value = '';
  placePopup.querySelector('.popup__button').classList.add('popup__button_disabled');
  hideErrorInInput(placePopup,validationConfig);
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
    document.addEventListener('keydown', checkEscKey);
    pic.src = evt.target.src;
    pic.alt = titleValue;
    picTitle.textContent = titleValue;
    hideErrorInInput(picturePopup,validationConfig);
  });
  return placeContainer;
}

initialCards.forEach (function(item){
  const card = createCard(item.name, item.link);
  placeGrid.append(card);
});

const addCard = () => {
  const card = createCard(picNameField.value, picURLField.value);
  cardsContainer.prepend(card);
  closePopup (placePopup);
}
placeForm.addEventListener('submit', function(event){
  event.preventDefault();
  addCard();
});


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





