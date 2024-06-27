document.addEventListener("DOMContentLoaded", function() {
  const messagesContainer = document.querySelector('.messages');
  const inputField = document.querySelector('.input-container input');
  const sendButton = document.querySelector('.input-container button');

  // 从服务器加载消息
  fetch('/messages')
    .then(response => response.json())
    .then(messages => {
      messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messagesContainer.appendChild(messageElement);
      });
    });

  // 发送消息到服务器
  sendButton.addEventListener('click', function() {
    const message = inputField.value;
    if (message) {
      fetch('/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
      }).then(() => {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messagesContainer.appendChild(messageElement);
        inputField.value = ''; // 清空输入框
      });
    }
  });
});
