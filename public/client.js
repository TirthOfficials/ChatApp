const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes();
let textarea1 = document.querySelector('#textarea')
let element=document.getElementById('button');
do {
    name = prompt('Please enter your name: ')
} while(!name)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
    
})
// element.addEventListener("click", sendMessage(textarea))
function sendMessage(message) {
    
    let msg = {
        user: name,
        time1: time,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user} ${msg.time1}</h4>
        <p>${msg.message}</p>
        
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
    
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}



