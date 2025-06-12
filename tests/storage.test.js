const { addTask, getTasks, removeTask, updateTask, recordTime } = require('../public/script.js');

describe('localStorage tasks', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('addTask stores a task', () => {
    const task = addTask('demo', { priority: 2, tags: ['x'] });
    expect(task.title).toBe('demo');
    expect(task.priority).toBe(2);
    expect(task.tags).toContain('x');
    expect(getTasks().length).toBe(1);
  });

  test('removeTask deletes a task', () => {
    const task = addTask('demo');
    removeTask(task.id);
    expect(getTasks()).toEqual([]);
  });

  test('updateTask modifies fields', () => {
    const task = addTask('demo');
    const updated = updateTask(task.id, { title: 'new', priority: 5 });
    expect(updated.title).toBe('new');
    expect(updated.priority).toBe(5);
    expect(getTasks()[0].title).toBe('new');
  });

  test('recordTime adds minutes', () => {
    const task = addTask('demo');
    recordTime(task.id, 15);
    expect(getTasks()[0].timeSpent).toBe(15);
  });
});
