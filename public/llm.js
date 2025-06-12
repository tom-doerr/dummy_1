import { pipeline } from '@xenova/transformers';

let generatorPromise;

async function loadGenerator() {
  if (!generatorPromise) {
    generatorPromise = pipeline('text-generation', 'Xenova/distilggpt2');
  }
  return generatorPromise;
}

export async function runLLMCommand(prompt) {
  const generator = await loadGenerator();
  const out = await generator(prompt, { max_new_tokens: 32 });
  const text = out[0].generated_text;
  // Very naive parsing examples
  let m = text.match(/add task "([^"]+)"(?: priority (\d))?/i);
  if (m) {
    const title = m[1];
    const priority = m[2] ? parseInt(m[2], 10) : 1;
    const task = addTask(title, { priority });
    addTaskToDOM(task);
    return task;
  }
  m = text.match(/edit task (\d+) title "([^"]+)"/i);
  if (m) {
    const id = parseInt(m[1], 10);
    const title = m[2];
    const task = updateTask(id, { title });
    renderTasks();
    return task;
  }
  return text;
}

window.runLLMCommand = runLLMCommand;
