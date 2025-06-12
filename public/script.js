function getTasks() {
  return JSON.parse(localStorage.getItem('tasks') || '[]');
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(title) {
  const tasks = getTasks();
  const id = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  const task = { id, title };
  tasks.push(task);
  saveTasks(tasks);
  return task;
}

function removeTask(id) {
  let tasks = getTasks();
  tasks = tasks.filter(t => t.id !== id);
  saveTasks(tasks);
}

function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.className = 'task-item';
  li.textContent = task.title;

  const del = document.createElement('button');
  del.textContent = 'Delete';
  del.className = 'delete';
  del.addEventListener('click', () => {
    removeTask(task.id);
    renderTasks();
  });

  li.appendChild(del);
  list.appendChild(li);
}

function renderTasks() {
  list.innerHTML = '';
  getTasks().forEach(addTaskToDOM);
}

function init() {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const title = titleInput.value.trim();
    if (!title) return;
    const task = addTask(title);
    titleInput.value = '';
    addTaskToDOM(task);
  });

  renderTasks();
}

if (typeof document !== 'undefined') {
  var form = document.getElementById('task-form');
  var titleInput = document.getElementById('title');
  var list = document.getElementById('task-list');
  document.addEventListener('DOMContentLoaded', init);
}

if (typeof module !== 'undefined') {
  module.exports = {
    getTasks,
    saveTasks,
    addTask,
    removeTask,
    addTaskToDOM,
    renderTasks,
    init,
  };
}
