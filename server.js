let express = require('express'),
    http = require('http'),
    app = express(),
    port = process.env.PORT || 3090,
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

//
// app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

app.use(express.static(__dirname + '/public'))


let server = http.Server(app)
let io = require('socket.io')(server)

io.on('connection', (client) => {
    client.emit('an event', {
        data: ` Connection de `
    })
})

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('authenticate', function(data, callback) {
        socket.auth = false;

        //Data du client
        var name = data.name;
        var password = data.password;
        
        User.find({
            name: name
        }, function(err, user) {
            user.forEach((element) => {
                console.log(element.name)

                // auth success/failure
                if (err && !(password === element.password && name === element.name))
                    socket.emit('Try again');
                else {
                    socket.auth = true;
                    socket.emit('authenticated', element.name)
                    console.log("Authenticated socket ", socket.id);
                }
            })
        });

        setTimeout(function() {
            //If the socket didn't authenticate, disconnect it
            if (!socket.auth) {
                console.log("Disconnecting socket ", socket.id);
                socket.emit('Try again');
                socket.disconnect('unauthorized');
            }
        }, 1000);
    })

    socket.on('pseudo', (user) => {
        user = ent.encode(user);
        console.log(user)
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

server.listen(port, () => {
    console.log('listening on *:3090');
});
