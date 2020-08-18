const socket = io('http://localhost:8000');

let msgtxt = document.getElementById('text')
let submit = document.getElementById('form')
let messageContainer = document.getElementsByClassName('container')[0]
let audio=new Audio('messenger_web.mp3')

let append = (message, position) => {

    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    console.log(messageElement)
    messageContainer.appendChild(messageElement);
    if(position=='left'){
        audio.play();
    }
}


const name = prompt('Enter your name');
socket.emit('new-user-joined', name);
socket.on('user-joined', name => {

    append(`${name} has joined`, 'right')
});
socket.on('receive', data => {
    const feedback = document.getElementsByClassName('feedback')[0]
    feedback.innerText=''
    append(`${data.name}:${data.message}`, 'left')

});
socket.on('left', name => {
    append(`${name} left the chat`, 'right');
    console.log('${name} has left')
});
submit.addEventListener('submit', function (e) {
    e.preventDefault()
    const message = msgtxt.value;

    append(`You: ${message}`, 'right');
    socket.emit('send', message);
  

    msgtxt.value = '';


}
)



// msgtxt.addEventListener('keypress', function (name) {
//     socket.emit('typing', name)
//     console.log('key is pressed by',name)
// });

// socket.on('typing', data => {
//     const feedback = document.getElementsByClassName('feedback')[0]
//     feedback.innertext=''

// console.log(data.name,'is typing')
//     feedback.innerText= `Someone is typing`
//     console.log(feedback)

// });
