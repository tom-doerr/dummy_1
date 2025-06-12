function loadScript() {
  jest.resetModules();
  document.body.innerHTML = '<ul id="task-list"></ul>';
  global.list = document.getElementById('task-list');
  return require('../public/script.js');
}

describe('additional edge cases', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
  });

  test('addTask applies default values', () => {
    const { addTask } = loadScript();
    const task = addTask('demo');
    expect(task.priority).toBe(1);
    expect(task.tags).toEqual([]);
    expect(task.timeSpent).toBe(0);
  });

  test('updateTask returns null when task missing', () => {
    const { addTask, updateTask, getTasks } = loadScript();
    addTask('first');
    const result = updateTask(999, { title: 'none' });
    expect(result).toBeNull();
    expect(getTasks().length).toBe(1);
  });

  test('recordTime returns null when task missing', () => {
    const { addTask, recordTime, getTasks } = loadScript();
    addTask('first');
    const result = recordTime(999, 5);
    expect(result).toBeNull();
    expect(getTasks()[0].timeSpent).toBe(0);
  });

  test('removeTask ignores missing id', () => {
    const { addTask, removeTask, getTasks } = loadScript();
    addTask('a');
    addTask('b');
    removeTask(999);
    expect(getTasks().length).toBe(2);
  });

  test('addTaskToDOM omits tag span when no tags', () => {
    const { addTask, addTaskToDOM } = loadScript();
    const task = addTask('demo');
    addTaskToDOM(task);
    expect(document.querySelector('span.tags')).toBeNull();
  });
});
