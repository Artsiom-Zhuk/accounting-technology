const config = {
  apiKey: 'AIzaSyCRm-aHbaF-cg9nsHNwxyWGdgnUM95VoDc',
  authDomain: 'accounting-technology.firebaseapp.com',
  databaseURL: 'https://accounting-technology.firebaseio.com',
  projectId: 'accounting-technology',
  storageBucket: '',
  messagingSenderId: '1079443672124',
};

firebase.initializeApp(config);
const database = firebase.database();

const inputForm = document.getElementById('inputForm');
const tbody = document.getElementById('tbody');
const inputCategory = document.getElementById('category');
const inputModel = document.getElementById('model');
const inputWeight = document.getElementById('weight');
const inputLength = document.getElementById('length');
const inputWidth = document.getElementById('width');
const inputHeight = document.getElementById('height');
const inputDateOfManufacture = document.getElementById('dateOfManufacture');
const inputCost = document.getElementById('cost');
const submitBtn = document.getElementById('submitBtn');
const searchCategory = document.getElementById('searchCategory');
const searchModel = document.getElementById('searchModel');
const btnCancelChange = document.getElementById('btnCancelChange');
const resetForm = document.getElementById('resetForm');


let isEdit = false;
let editKey = null;

let searchCategoryText = '';
let searchModelText = '';

function isDisabled() {
  btnCancelChange.disabled = true;
}

function isNotDisabled() {
  btnCancelChange.disabled = false;
}

function renderTable() {
  database
    .ref()
    .once('value')
    .then((e) => {
      const data = e.val();
      while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
      }
      for (const key in data.leads) {
        const propDataLeadsByKey = data.leads[key];

        if (
          ~propDataLeadsByKey.category.indexOf(searchCategoryText) &&
          ~propDataLeadsByKey.model.indexOf(searchModelText)
        ) {
          const tr = document.createElement('tr');
          const btnDel = document.createElement('input');
          btnDel.setAttribute('type', 'button');
          btnDel.setAttribute('value', 'Удалить');
          btnDel.addEventListener('click', () => {
            database.ref(`leads/${key}`).remove();
            alert('Данные были успешно удалены');
            isDisabled();
            renderTable();
          });
          const btnChange = document.createElement('input');
          btnChange.setAttribute('type', 'button');
          btnChange.setAttribute('value', 'Изменить');
          btnChange.addEventListener('click', () => {
            inputCategory.value = propDataLeadsByKey.category;
            inputModel.value = propDataLeadsByKey.model;
            inputWeight.value = propDataLeadsByKey.weight;
            inputLength.value = propDataLeadsByKey.length;
            inputWidth.value = propDataLeadsByKey.width;
            inputHeight.value = propDataLeadsByKey.height;
            inputDateOfManufacture.value = propDataLeadsByKey.dateOfManufacture;
            inputCost.value = propDataLeadsByKey.cost;

            isEdit = true;
            editKey = key;

            submitBtn.setAttribute('value', 'Доб. измен.');
            isNotDisabled();
          });

          btnCancelChange.addEventListener('click', () => {
            submitBtn.setAttribute('value', 'Добавить');
            isEdit = false;
            editKey = null;
            inputCategory.value = '';
            inputModel.value = '';
            inputWeight.value = '';
            inputLength.value = '';
            inputWidth.value = '';
            inputHeight.value = '';
            inputDateOfManufacture.value = '';
            inputCost.value = '';
            isDisabled();
          });

          const tdCategory = document.createElement('td');
          const tdModel = document.createElement('td');
          const tdWeight = document.createElement('td');
          const tdLength = document.createElement('td');
          const tdWidth = document.createElement('td');
          const tdHeight = document.createElement('td');
          const tdDateOfManufacture = document.createElement('td');
          const tdCost = document.createElement('td');
          const tdDelete = document.createElement('td');
          const tdChange = document.createElement('td');
          tdCategory.innerHTML = propDataLeadsByKey.category;
          tdModel.innerHTML = propDataLeadsByKey.model;
          tdWeight.innerHTML = propDataLeadsByKey.weight;
          tdLength.innerHTML = propDataLeadsByKey.length;
          tdWidth.innerHTML = propDataLeadsByKey.width;
          tdHeight.innerHTML = propDataLeadsByKey.height;
          tdDateOfManufacture.innerHTML = propDataLeadsByKey.dateOfManufacture;
          tdCost.innerHTML = propDataLeadsByKey.cost;
          tdDelete.appendChild(btnDel);
          tdChange.appendChild(btnChange);
          tr.appendChild(tdCategory);
          tr.appendChild(tdModel);
          tr.appendChild(tdWeight);
          tr.appendChild(tdLength);
          tr.appendChild(tdWidth);
          tr.appendChild(tdHeight);
          tr.appendChild(tdDateOfManufacture);
          tr.appendChild(tdCost);
          tr.appendChild(tdDelete);
          tr.appendChild(tdChange);
          tbody.appendChild(tr);
        }
      }
    });
}

inputForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const category = inputCategory.value;
  const model = inputModel.value;
  const weight = inputWeight.value;
  const length = inputLength.value;
  const width = inputWidth.value;
  const height = inputHeight.value;
  const dateOfManufacture = inputDateOfManufacture.value;
  const cost = inputCost.value;

  let key;

  if (isEdit) {
    key = editKey;
  } else {
    key = database
      .ref()
      .child('leads')
      .push().key;
  }

  database.ref(`leads/${key}/category`).set(category);
  database.ref(`leads/${key}/model`).set(model);
  database.ref(`leads/${key}/weight`).set(weight);
  database.ref(`leads/${key}/length`).set(length);
  database.ref(`leads/${key}/width`).set(width);
  database.ref(`leads/${key}/height`).set(height);
  database.ref(`leads/${key}/dateOfManufacture`).set(dateOfManufacture);
  database.ref(`leads/${key}/cost`).set(cost);
  alert('Данные отправлены на сервер');
  renderTable();
  isEdit = false;
  editKey = null;
  submitBtn.setAttribute('value', 'Добавить');
  isDisabled();
});

renderTable();

searchCategory.addEventListener('input', (event) => {
  searchCategoryText = event.target.value;
  renderTable();
});

searchModel.addEventListener('input', (event) => {
  searchModelText = event.target.value;
  renderTable();
});

const resetCategory = document.getElementById('resetCategory');
resetCategory.addEventListener('click', () => {
  searchCategoryText = '';
  searchCategory.value = '';
  renderTable();
});

const resetModel = document.getElementById('resetModel');
resetModel.addEventListener('click', () => {
  searchModelText = '';
  searchModel.value = '';
  renderTable();
});