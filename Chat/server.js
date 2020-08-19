const io = require('socket.io')(8000)
const users = {}
io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);

    });
    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
        console.log(message,name)

    })
    socket.on('typing', data => {
      
        socket.broadcast.emit('typing', {name:users[socket.id]})
    })


    console.log('a user connected');
    socket.on('disconnect', (message) => {
        socket.broadcast.emit('left',users[socket.id]);

        console.log('a user disconnected');
        delete users[socket.id]

    });

})