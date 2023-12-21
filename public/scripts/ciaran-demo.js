// Function to add a user message to the chat interface
function addUserMessage(message) {
    const chat = document.querySelector('.chat');
    const userMessage = document.createElement('div');
    userMessage.className = 'message sent';
    userMessage.textContent = message;
    chat.appendChild(userMessage);
}

// Function to add a chatbot response to the chat interface
function addChatbotResponse(response) {
    const chat = document.querySelector('.chat');
    const chatbotResponse = document.createElement('div');
    chatbotResponse.className = 'message received';
    chatbotResponse.textContent = response;
    chat.appendChild(chatbotResponse);
}

// Function to handle user input and chatbot responses
function handleUserInput() {
    const userInput = document.getElementById('user-input');
    const userMessage = userInput.value;

    if (userMessage.trim() !== '') {
        addUserMessage(userMessage);

        // Replace this logic with your chatbot's responses
        const chatbotResponse = "I'm just a simple chatbot. I don't have real responses!";
        addChatbotResponse(chatbotResponse);

        userInput.value = ''; // Clear the input field
        scrollToBottom();
    }
}

function handleUserInput() {
    const userInput = document.getElementById('user-input');
    const userMessage = userInput.value;

    // Check for null message
    if (userMessage.trim() !== '') {
        addUserMessage(userMessage);

        // Check for keywords and provide more conversational responses
        const lowerCaseMessage = userMessage.toLowerCase();

        if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
            addChatbotResponse('Hi there! How can I assist you today?');
        } else if (lowerCaseMessage.includes('products') || lowerCaseMessage.includes('what do you offer')) {
            addChatbotResponse("We offer a range of products, including AI systems, industrial automation solutions, and more. Is there something specific you'd like to know about?");
        } else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('how can I reach you')) {
            addChatbotResponse('You can reach us at contact@ciaranindustries.com. Feel free to drop us a message.');
        } else if (lowerCaseMessage.includes('help') || lowerCaseMessage.includes('what can you do')) {
            addChatbotResponse("I can assist you with various tasks, answer questions, and provide information about our products. Just ask me anything!");
        } else {
            addChatbotResponse("I'm not sure I understand that. Can you please rephrase your question or provide more details?");
        }

        userInput.value = ''; // Clear the input field
    }
}


// Attach the input field to the enter key
document.getElementById('user-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        handleUserInput();
    }
});
