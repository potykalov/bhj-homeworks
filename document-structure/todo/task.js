function renderTasks(tasks, tasksListEl) {
  tasksListEl.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskEl = document.createElement('div');

    taskEl.className = 'task';
    taskEl.innerHTML = `
        <div class="task__title">
            ${task}
        </div>
        <a href="#" class="task__remove">&times;</a>
    `;

    tasksListEl.append(taskEl);

    const taskRemove = taskEl.querySelector('.task__remove');

    taskRemove.addEventListener('click', (e) => {
      e.preventDefault();

      tasks.splice(index, 1);

      saveTasks(tasks);
      renderTasks(tasks, tasksListEl);
    });
  });
}

function saveTasks(tasks) {
  const serializedTasks = JSON.stringify(tasks);
  localStorage.setItem('tasks', serializedTasks);
}

function loadTasks() {
  const savedTasksJson = localStorage.getItem('tasks');
  const savedTasks = JSON.parse(savedTasksJson);

  return savedTasks || [];
}

function init() {
  const tasks = loadTasks();

  const formEl = document.querySelector('#tasks__form');
  const inputEl = document.querySelector('#task__input');
  const tasksListEl = document.querySelector('#tasks__list');

  renderTasks(tasks, tasksListEl);

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputText = inputEl.value.trim();

    if (inputText) {
      tasks.push(inputText);
      saveTasks(tasks);
      renderTasks(tasks, tasksListEl);
      formEl.reset();
    }
  });
}

window.addEventListener('DOMContentLoaded', init);
