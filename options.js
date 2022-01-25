// let page = document.getElementById("buttonDiv");
// let selectedClassName = "current";
// const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

// // Reacts to a button click by marking marking the selected button and saving
// // the selection
// function handleButtonClick(event) {
//   // Remove styling from the previously selected color
//   let current = event.target.parentElement.querySelector(
//     `.${selectedClassName}`
//   );
//   if (current && current !== event.target) {
//     current.classList.remove(selectedClassName);
//   }

//   // Mark the button as selected
//   let color = event.target.dataset.color;
//   event.target.classList.add(selectedClassName);
//   chrome.storage.sync.set({ color });
// }

// // Add a button to the page for each supplied color
// function constructOptions(buttonColors) {
//   chrome.storage.sync.get("color", (data) => {
//     let currentColor = data.color;

//     // For each color we were provided…
//     for (let buttonColor of buttonColors) {
//       // …crate a button with that color…
//       let button = document.createElement("button");
//       button.dataset.color = buttonColor;
//       button.style.backgroundColor = buttonColor;

//       // …mark the currently selected color…
//       if (buttonColor === currentColor) {
//         button.classList.add(selectedClassName);
//       }

//       // …and register a listener for when that button is clicked
//       button.addEventListener("click", handleButtonClick);
//       page.appendChild(button);
//     }
//   });
// }

// // Initialize the page by constructing the color options
// constructOptions(presetButtonColors);
// const mydata = [
//   {
//     label: "Test 1",
//     url: "http://localhost:4200/merchants/new",
//     formHandle: "form",
//     inputs: [
//       { handle: `[formcontrolname="name"]`, value: 'test data' },
//       { handle: `[formcontrolname="city"]`, value: 'Wrocław' }
//     ]
//   },
//   {
//     label: "Test 2",
//     url: "backoffice.payeye.com",
//     formHandle: "form",
//     inputs: [
//       { handle: `[formcontrolname="name"]`, value: 'test data' }
//     ]
//   }  
// ]
// chrome.storage.sync.set({ "items": mydata });

let data = [];

function init() {
  chrome.storage.sync.get("items", (loaded) => {
    data = loaded["items"];
    render(data);
  });
}

function render(data) {
  const list = document.getElementById('listing');
  list.innerHTML = '';
  data.forEach(x => {
    const loadBtn = document.createElement('button');
    loadBtn.innerText = 'Load';
    loadBtn.onclick = () => loadItem(x);

    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';
    removeBtn.onclick = () => removeItem(x);

    const el = document.createElement('li');
    el.innerHTML = x.label;
    el.append(loadBtn);
    el.append(removeBtn);
    list.append(el);
  }); 
}

function loadItem(item) {
  document.getElementById('editor').value = JSON.stringify(item);
}

function removeItem(item) {
  data = data.filter(x => x != item);
  render(data);
  saveToDb(data);
}

function save() {
  console.log('sae')
  const obj = JSON.parse(document.getElementById('editor').value);
  data.push(obj);
  render(data);
  saveToDb(data);
}

function saveToDb(data) {
  chrome.storage.sync.set({ "items": data });
}

document.getElementById('save-btn').addEventListener('click', save);

init();