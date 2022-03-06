import { getRandomInt } from './helpers/common.js';
import { generateNip } from './helpers/nip.js';
import { generateRegon } from './helpers/regon.js';
import { generatePesel } from './helpers/pesel.js';
import { getRandomIban } from './helpers/iban-generator.js';
import { generateIdNumber } from './helpers/id-number-generator.js';

const itemsHandle = document.getElementById("items");
const replacments = [
  { key: 'NIP', func: () => generateNip() },
  { key: 'REGON', func: () => generateRegon() },
  { key: 'RAND', func: () => getRandomInt(1000, 99999) },
  { key: 'PESEL', func: () => generatePesel() },
  { key: 'IBAN', func: () => getRandomIban() },
  { key: 'IDDOCUMENT', func: () => generateIdNumber() }
]

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  var activeTab = tabs[0];
  const currentUrl = activeTab.url;
  chrome.storage.sync.get(["items"], (items) => {
    const data = items['items'].filter((item) => currentUrl.indexOf(item.url) >= 0);
    data.forEach(item => {
      const btn = document.createElement('button');
      btn.innerText = item.label;
      btn.onclick = () => onItemClicked(item);
      itemsHandle.append(btn);
    });

    if(data.length === 0) {
      itemsHandle.innerText = 'Empty list'
    }
  })
});

const onItemClicked = async (itemData) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const clone = Object.assign({}, itemData);
  clone.inputs.forEach(input => {
    replacments.forEach(r => {
      input.value = input.value.replace(`{${r.key}}`, r.func())
    });
  });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: adjustForm,
    args: [clone]
  });
}

const adjustForm = (itemData, replacments) => {
  const form = document.querySelector(itemData.formHandle);
  itemData.inputs.forEach(inputData => {
    const input = form.querySelector(inputData.handle);
    if(!input) {
      console.error(`Control with handle ${inputData.handle} not found`);
      return;
    }
    input.value = inputData.value;
    const changeEvent = new Event("input");
    input.dispatchEvent(changeEvent);
  });
}

replacments.forEach(rep => {
  const btn = document.createElement('button');
  btn.innerText = rep.key;
  btn.onclick = () => setGeneratedValue(rep.func());
  document.getElementById('generators').append(btn);
});

function setGeneratedValue(value) {
  document.getElementById('generated').value = value;
  setToFocusedElement(value);
}

function setToFocusedElement(value) {
    chrome.tabs.query({ active: true, currentWindow: true })
    .then((x) => {
      chrome.scripting.executeScript({
        target: { tabId: x[0].id },
        function: (val) => document.activeElement.value = val,
        args: [value]
      });
    });
}

/**** NIP ****/

/**** END NIP ****/