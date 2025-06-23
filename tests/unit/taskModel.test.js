const Task = require('../../models/Task');

describe('Task Model', () => {
  it('should create a task with default status', () => {
    const task = new Task({ title: 'Test Task' });
    expect(task.status).toBe('pending');
  });

  it('should allow custom status', () => {
    const task = new Task({ title: 'Test', status: 'completed' });
    expect(task.status).toBe('completed');
  });
});
