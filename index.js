let app = require('express')(),
    http = require('http').Server(app),
    port = process.env.PORT || 3090,
    io = require('socket.io')(http),
    ent = require('ent'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;


let UserSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    age: {
        type: Number,
        default: 99
    },
    address: {
        type: String
    },
}, {
    timestamps: true
})

var User = mongoose.model('User', UserSchema) // Model qui va utiliser le Schema


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});



io.on('connection', (client) => {
    client.emit('an event', {
        data: ` Connection de `
    })
})

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('authenticate', function(data, callback) {
        socket.auth = false;

        //get credentials sent by the client
        var name = data.name;
        var password = data.password;

        User.find( {
            name: name
        }, function(err, user) {
          user.forEach((element)=>{
            console.log(element.password)
            // auth success/failure
            if (err || password != element.password ) socket.disconnect('unauthorized');
            else {
                socket.auth = true;
                socket.emit('authenticated')
                console.log("Authenticated socket ", socket.id);
            }
          })
        });

        setTimeout(function() {
            //If the socket didn't authenticate, disconnect it
            if (!socket.auth) {
                console.log("Disconnecting socket ", socket.id);
                socket.disconnect('unauthorized');
            }
        }, 1000);
    })

    socket.on('pseudo', (user) => {
        user = ent.encode(user);
        socket.user = user
        socket.broadcast.emit('pseudo', ` Connection de : ${socket.user}`)

    })


    socket.on('chat message', (message) => {
        message = ent.encode(message);
        socket.broadcast.emit('chat message', {
            pseudo: socket.user,
            content: message
        });
    });


});


mongoose.connect('mongodb://localhost:27017/express');

http.listen(port, () => {
    console.log('listening on *:3090');
});
