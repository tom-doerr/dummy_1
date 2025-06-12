function addMessage(sender, text) {
  const div = document.createElement('div');
  div.className = 'chat-msg';
  div.textContent = `${sender}: ${text}`;
  chatLog.appendChild(div);
}

async function handlePrompt(prompt) {
  addMessage('You', prompt);
  chatInput.value = '';
  const response = await (window.runLLMCommand ? window.runLLMCommand(prompt) : Promise.resolve(''));
  const text = typeof response === 'string' ? response : JSON.stringify(response);
  addMessage('Bot', text);
}

function initChat() {
  chatForm = document.getElementById('chat-form');
  chatInput = document.getElementById('chat-input');
  chatLog = document.getElementById('chat-log');
  if (!chatForm) return;
  chatForm.addEventListener('submit', e => {
    e.preventDefault();
    const prompt = chatInput.value.trim();
    if (!prompt) return;
    handlePrompt(prompt);
  });
}

if (typeof document !== 'undefined') {
  var chatForm, chatInput, chatLog;
  document.addEventListener('DOMContentLoaded', initChat);
}

if (typeof module !== 'undefined') {
  module.exports = { initChat, addMessage, handlePrompt };
}
