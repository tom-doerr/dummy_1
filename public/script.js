function getTasks() {
  return JSON.parse(localStorage.getItem('tasks') || '[]');
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(title, { priority = 1, tags = [], timeSpent = 0 } = {}) {
  const tasks = getTasks();
  const id = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
  const task = { id, title, priority, tags, timeSpent };
  tasks.push(task);
  saveTasks(tasks);
  return task;
}

function updateTask(id, updates) {
  const tasks = getTasks();
  const idx = tasks.findIndex(t => t.id === id);
  if (idx === -1) return null;
  tasks[idx] = { ...tasks[idx], ...updates };
  saveTasks(tasks);
  return tasks[idx];
}

function recordTime(id, minutes) {
  const task = getTasks().find(t => t.id === id);
  if (!task) return null;
  const total = (task.timeSpent || 0) + minutes;
  return updateTask(id, { timeSpent: total });
}

function removeTask(id) {
  let tasks = getTasks();
  tasks = tasks.filter(t => t.id !== id);
  saveTasks(tasks);
}

function addTaskToDOM(task) {
  const li = document.createElement('li');
  li.className = 'task-item';
  if (task.priority >= 8) {
    li.classList.add('high-priority');
  } else if (task.priority <= 3) {
    li.classList.add('low-priority');
  }

  const titleSpan = document.createElement('span');
  titleSpan.textContent = `${task.title} (p${task.priority})`;
  li.appendChild(titleSpan);

  if (task.tags.length) {
    const tagsSpan = document.createElement('span');
    tagsSpan.className = 'tags';
    tagsSpan.textContent = ` [${task.tags.join(', ')}]`;
    li.appendChild(tagsSpan);
  }

  const timeSpan = document.createElement('span');
  timeSpan.className = 'time';
  timeSpan.textContent = ` ${task.timeSpent}m`;
  li.appendChild(timeSpan);

  const inc = document.createElement('button');
  inc.textContent = '+5m';
  inc.className = 'time-add';
  inc.addEventListener('click', () => {
    recordTime(task.id, 5);
    renderTasks();
  });
  li.appendChild(inc);

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
  getTasks()
    .sort((a, b) => b.priority - a.priority)
    .forEach(addTaskToDOM);
}


function init() {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const title = titleInput.value.trim();
    if (!title) return;
    const priority = parseInt(priorityInput.value || '1', 10);
    const tags = tagsInput.value
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);
    const task = addTask(title, { priority, tags });
    titleInput.value = '';
    priorityInput.value = '1';
    tagsInput.value = '';
    addTaskToDOM(task);
  });

  renderTasks();
}

if (typeof document !== 'undefined') {
  var form = document.getElementById('task-form');
  var titleInput = document.getElementById('title');
  var priorityInput = document.getElementById('priority');
  var tagsInput = document.getElementById('tags');
  var list = document.getElementById('task-list');
  document.addEventListener('DOMContentLoaded', init);
}

if (typeof module !== 'undefined') {
  module.exports = {
    getTasks,
    saveTasks,
    addTask,
    updateTask,
    recordTime,
    removeTask,
    addTaskToDOM,
    renderTasks,
    init,
  };
}
