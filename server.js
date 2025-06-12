const express = require('express');
const path = require('path');

function createApp() {
  const app = express();
  let tasks = [];
  let nextId = 1;

  app.use(express.json());
  app.use(express.static(path.join(__dirname, 'public')));

  app.get('/api/tasks', (req, res) => {
    res.json(tasks);
  });

  app.post('/api/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    const task = { id: nextId++, title };
    tasks.push(task);
    res.status(201).json(task);
  });

  app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    tasks = tasks.filter(t => t.id !== id);
    res.status(204).end();
  });

  app.reset = () => {
    tasks = [];
    nextId = 1;
  };

  return app;
}

const app = createApp();
const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
