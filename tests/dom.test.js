const fs = require('fs');

// Setup DOM elements before requiring the script
function loadScript() {
  jest.resetModules();
  document.body.innerHTML = `
    <form id="task-form">
      <input id="title" />
      <button type="submit">Add</button>
    </form>
    <ul id="task-list"></ul>
  `;
  return require('../public/script.js');
}

beforeEach(() => {
  localStorage.clear();
});

describe('DOM interactions', () => {
  test('addTaskToDOM creates list item', () => {
    const { addTaskToDOM } = loadScript();
    const task = { id: 1, title: 'demo' };
    addTaskToDOM(task);
    const li = document.querySelector('li.task-item');
    expect(li).not.toBeNull();
    expect(li.textContent).toContain('demo');
  });

  test('renderTasks populates list from storage', () => {
    localStorage.setItem('tasks', JSON.stringify([{ id: 1, title: 'stored' }]));
    const { renderTasks } = loadScript();
    renderTasks();
    const items = document.querySelectorAll('li.task-item');
    expect(items.length).toBe(1);
    expect(items[0].textContent).toContain('stored');
  });

  test('init adds submit handler to create tasks', () => {
    const { init, getTasks } = loadScript();
    init();
    const input = document.getElementById('title');
    input.value = 'mytask';
    document.getElementById('task-form').dispatchEvent(new Event('submit'));
    const items = document.querySelectorAll('li.task-item');
    expect(items.length).toBe(1);
    expect(items[0].textContent).toContain('mytask');
    expect(getTasks().length).toBe(1);
  });

  test('delete button removes task', () => {
    const { addTask, renderTasks, getTasks } = loadScript();
    addTask('todelete');
    renderTasks();
    const button = document.querySelector('button.delete');
    button.dispatchEvent(new Event('click'));
    expect(getTasks()).toEqual([]);
    expect(document.querySelectorAll('li.task-item').length).toBe(0);
  });

  test('tasks render on DOMContentLoaded', () => {
    localStorage.setItem('tasks', JSON.stringify([{ id: 5, title: 'persisted' }]));
    jest.resetModules();
    document.body.innerHTML = `
      <form id="task-form">
        <input id="title" />
        <button type="submit">Add</button>
      </form>
      <ul id="task-list"></ul>
    `;
    require('../public/script.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    const items = document.querySelectorAll('li.task-item');
    expect(items.length).toBe(1);
    expect(items[0].textContent).toContain('persisted');
  });
});
