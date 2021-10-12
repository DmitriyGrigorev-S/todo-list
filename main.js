const form = document.querySelector('#addForm');
const taskList = document.querySelector('#items');
const filter = document.querySelector('#filter');
const cardContainer = document.querySelector('#main');

form.addEventListener('submit', addItem);
filter.addEventListener('keyup', filterTask);
taskList.addEventListener('click', removeTask);

function addItem(evt) {
  evt.preventDefault();
  const newItemInput = document.querySelector('#newItemText');
  const newItemText = newItemInput.value;
  const newElementList = document.createElement('li');
  const newBtnDelete = document.createElement('button');

  createElementList(newBtnDelete, newElementList, newItemText);

  if (newItemInput.value == '') {
    alert('Введите название задачи');
  } else {
    taskList.insertAdjacentElement('afterbegin', newElementList);
    newItemInput.value = '';
    watchingNumberTasks();
  }
}

function createElementList(button, elementList, itemText) {
  button.className = 'btn btn-light btn-sm float-right';
  button.setAttribute('data-action', 'delete');
  button.setAttribute('type', 'button');
  button.innerText = 'Удалить';

  elementList.className = 'list-group-item';
  elementList.insertAdjacentHTML('afterbegin', itemText);
  elementList.insertAdjacentElement('beforeend', button);
}

function removeTask(evt) {
  const target = evt.target;

  if (
    target.hasAttribute('data-action') &&
    target.getAttribute('data-action') == 'delete'
  ) {
    if (confirm('Удалить задачу?')) {
      target.parentNode.remove();
      watchingNumberTasks();
    }
  }
}

function filterTask(evt) {
  let target = evt.target;
  let value = target.value.toLowerCase();
  let tasks = taskList.querySelectorAll('li');
  let arrayTasks = [];

  tasks.forEach(function (item) {
    const getElementText = item.firstChild.textContent.trim().toLowerCase();
    const noticeText = document.querySelector('.notice-text');
    const userRequest = noticeText.querySelector('span');
    let getFilterValue = filter.value;

    if (getElementText.indexOf(value) != -1) {
      item.style.display = 'block';
      item.setAttribute('data-element', 'show');
    } else {
      item.style.display = 'none';
      item.setAttribute('data-element', 'hide');
    }
    arrayTasks.push(item.dataset.element);

    if (arrayTasks.indexOf('show') == -1) {
      noticeText.classList.remove('hide');
      userRequest.textContent = `${getFilterValue}`;
    } else {
      noticeText.classList.add('hide');
    }
  });
}

function watchingNumberTasks() {
  let tasks = taskList.querySelectorAll('li');

  if (tasks.length < 1) {
    const nothingYet = `
      <div class="nothing-yet">
        <div class="nothing-yet__title">Пока ничего нет</div>
        <div class="nothing-yet__subtitle"><a href="#" data-switch-focus>Добавьте</a> свою первую задачу</div>
      </div>
    `;

    cardContainer.insertAdjacentHTML('beforeend', nothingYet);
    swichFocus();
  } else {
    document.querySelector('.nothing-yet').remove();
  }
}
watchingNumberTasks();

function swichFocus() {
  const btn = document.querySelector('[data-switch-focus]');

  btn.addEventListener('click', function (evt) {
    evt.preventDefault();

    console.log(231132);

    const fieldInput = document.querySelector('#newItemText');
    fieldInput.focus();
  });
}
swichFocus();
