document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('task-form');
  const titleInput = document.getElementById('title');
  const list = document.getElementById('task-list');

  function loadTasks() {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(tasks => {
        list.innerHTML = '';
        tasks.forEach(addTaskToDOM);
      });
  }

  function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.textContent = task.title;

    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.className = 'delete';
    del.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(del);
    list.appendChild(li);
  }

  function deleteTask(id) {
    fetch(`/api/tasks/${id}`, { method: 'DELETE' })
      .then(() => loadTasks());
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const title = titleInput.value.trim();
    if (!title) return;
    fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
      .then(() => {
        titleInput.value = '';
        loadTasks();
      });
  });

  loadTasks();
});
