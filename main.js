const form = document.querySelector('#addForm');
const taskList = document.querySelector('#items');
const filter = document.querySelector('#filter');
const cardContainer = document.querySelector('#main');

let data = [];
loadData();

form.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newItemInput = document.querySelector('#newItemText');
  const newItemText = newItemInput.value;
  const id = generateId();

  if (newItemInput.value == '') {
    alert('Введите название задачи');
  } else {
    if (saveData(newItemText)) {
      createElementList(id, newItemText);
    }
    newItemInput.value = '';
    watchingNumberTasks();
  }
});

filter.addEventListener('keyup', function (evt) {
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
});

taskList.addEventListener('click', function (evt) {
  const target = evt.target;

  if (
    target.hasAttribute('data-action') &&
    target.getAttribute('data-action') == 'delete'
  ) {
    if (confirm('Удалить задачу?')) {
      let item = target.parentElement;
      let id = parseInt(item.dataset.id);

      data = data.filter(function (elem) {
        return elem.id !== id;
      });

      localStorage.setItem('tasks', JSON.stringify(data));
      target.parentNode.remove();
      watchingNumberTasks();
    }
  }
});

function createElementList(id, task) {
  const elem = document.createElement('li');

  elem.className = 'list-group-item';
  elem.dataset.id = id;
  elem.textContent = task;

  const button = createDeletButton();

  elem.append(button);
  taskList.prepend(elem);
}

function createDeletButton() {
  const button = document.createElement('button');

  button.className = 'btn btn-light btn-sm float-right';
  button.setAttribute('data-action', 'delete');
  button.setAttribute('type', 'button');
  button.innerText = 'Удалить';

  return button;
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
    let notice = document.querySelector('.nothing-yet');

    if (!notice) return false;

    notice.remove();
  }
}

function swichFocus() {
  const btn = document.querySelector('[data-switch-focus]');

  if (!btn) return false;

  btn.addEventListener('click', function (evt) {
    evt.preventDefault();

    document.querySelector('#newItemText').focus();
  });
}

function generateId() {
  let id = 0;
  if (data.length > 0) {
    id = data[data.length - 1]['id'];
  }

  return id + 1;
}

function saveData(task) {
  if (!task) {
    alert('Вы не ввели задачу');
    return;
  }

  var id = generateId();

  data.push({
    id: id,
    task: task,
  });

  localStorage.setItem('tasks', JSON.stringify(data));

  return true;
}

function loadData() {
  let tasks = localStorage.getItem('tasks');

  if (!tasks) return;

  data = JSON.parse(tasks);

  data.forEach(function (item) {
    createElementList(item.id, item.task);
  });
}

swichFocus();
watchingNumberTasks();
