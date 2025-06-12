const { addTask, getTasks, removeTask } = require('../public/script.js');

describe('localStorage tasks', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('addTask stores a task', () => {
    const task = addTask('demo');
    expect(task.title).toBe('demo');
    expect(getTasks().length).toBe(1);
  });

  test('removeTask deletes a task', () => {
    const task = addTask('demo');
    removeTask(task.id);
    expect(getTasks()).toEqual([]);
  });
});
