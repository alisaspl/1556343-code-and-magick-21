'use strict';

// Config /////////////////////////

const wizardsNames = `Иван
Хуан Себастьян
Мария
Кристоф
Виктор
Юлия
Люпита
Вашингтон`.split(`\n`);

const wizardsSurnames = `да Марья
Верон
Мирабелла
Вальц
Онопко
Топольницкая
Нионго
Ирвинг`.split(`\n`);

const wizardsCoatColors = `rgb(101, 137, 164)
rgb(241, 43, 107)
rgb(146, 100, 161)
rgb(56, 159, 117)
rgb(215, 210, 55)
rgb(0, 0, 0)`.split(`\n`);

const wizardsEyesColors = `black
red
blue
yellow
green`.split(`\n`);

const wizardsContainer = document.querySelector(`.setup-similar-list`);
const wizardTemplate = document.querySelector(`#similar-wizard-template`).content.firstElementChild;
const openSetupBtn = document.querySelector(`.setup-open`);
const closeSetupBtn = document.querySelector(`.setup-close`);
const setupOverlay = document.querySelector(`.setup`);
const openSetupIcon = document.querySelector(`.setup-open-icon`);
const userNameInput = document.querySelector(`.setup-user-name`);
const setupForm = document.querySelector(`.setup-wizard-form`);
const setupSubmitBtn = document.querySelector(`.setup-submit`);

const focusIn = {
  openIcon: false,
  userNameInput: false,
  closeSetupBtn: false,
  setupSubmitBtn: false,
};

// Mock data ///////////////////////

const wizards = generateRandomWizards();

// Runtime ////////////////////////

createSimilarWizardsHTMLElement(wizards);

document.querySelector(`.setup-similar`).classList.remove(`hidden`);

openSetupBtn.onclick = openSetup;
closeSetupBtn.onclick = closeSetup;

bindFocus(openSetupIcon, `openIcon`);
bindFocus(userNameInput, `userNameInput`);
bindFocus(closeSetupBtn, `closeSetupBtn`);
bindFocus(setupSubmitBtn, `setupSubmitBtn`);

setupSubmitBtn.onclick = function () {
  if (isSetupOverlayOpened()) {
    setupForm.submit();
  }
};

document.addEventListener(`keydown`, function (ev) {
  if (ev.key === `Enter`) {
    if (!isSetupOverlayOpened() && focusIn.openIcon) {
      openSetup();
    } else if (isSetupOverlayOpened() && focusIn.closeSetupBtn) {
      closeSetup();
    } else if (isSetupOverlayOpened() && focusIn.setupSubmitBtn) {
      setupForm.submit();
    }
  }
  if (ev.key === `Escape`) {
    if (isSetupOverlayOpened() && !focusIn.userNameInput) {
      closeSetup();
    }
  }
});

// Functions //////////////////////

function bindFocus(el, focusInAttrName) {
  el.onmouseover = function () {
    focusIn[focusInAttrName] = true;
  };
  el.onmouseout = function () {
    focusIn[focusInAttrName] = false;
  };
}

function openSetup() {
  setupOverlay.classList.remove(`hidden`);
}

function closeSetup() {
  setupOverlay.classList.add(`hidden`);
}

function isSetupOverlayOpened() {
  return !setupOverlay.classList.contains(`hidden`);
}

function createSimilarWizardsHTMLElement(data) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < data.length; i++) {
    fragment.appendChild(createWizardHTMLElement(data[i]));
  }
  wizardsContainer.appendChild(fragment);
}

function createWizardHTMLElement(w) {
  let t = wizardTemplate.cloneNode(true);
  t.querySelector(`.setup-similar-label`).textContent = w.name;
  t.querySelector(`.wizard-coat`).style.fill = w.coatColor;
  t.querySelector(`.wizard-eyes`).style.fill = w.eyesColor;
  return t;
}

function generateRandomWizards() {
  const data = [];
  for (let i = 0; i < 4; i++) {
    data.push({
      name: `${getRandomArrayElement(wizardsNames)} ${getRandomArrayElement(wizardsSurnames)}`,
      coatColor: getRandomArrayElement(wizardsCoatColors),
      eyesColor: getRandomArrayElement(wizardsEyesColors),
    });
  }
  return data;
}

function getRandomInteger(max) {
  return Math.floor(Math.random() * max);
}
function getRandomArrayElement(array) {
  return array[getRandomInteger(array.length)];
}
