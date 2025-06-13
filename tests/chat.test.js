function loadChat() {
  jest.resetModules();
  document.body.innerHTML = `
    <form id="chat-form">
      <input id="chat-input" />
      <button type="submit">Send</button>
    </form>
    <div id="chat-log"></div>
  `;
  global.runLLMCommand = jest.fn(async p => `echo ${p}`);
  return require('../public/chat.js');
}

describe('chat bot', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    delete global.runLLMCommand;
  });

  test('handlePrompt adds messages', async () => {
    const { handlePrompt, initChat } = loadChat();
    initChat();
    await handlePrompt('hello');
    const msgs = document.querySelectorAll('.chat-msg');
    expect(msgs.length).toBe(2);
    expect(msgs[0].textContent).toBe('You: hello');
    expect(msgs[1].textContent).toBe('Bot: echo hello');
  });

  test('form submit sends prompt', async () => {
    const { initChat } = loadChat();
    initChat();
    document.getElementById('chat-input').value = 'test';
    document.getElementById('chat-form').dispatchEvent(new Event('submit'));
    await new Promise(r => setTimeout(r, 0));
    expect(global.runLLMCommand).toHaveBeenCalledWith('test');
    expect(document.querySelectorAll('.chat-msg').length).toBe(2);
  });
});
