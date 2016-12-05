((app) => {
    'use strict'
    app.component('chat', {
        templateUrl: 'js/components/chat/chat.html',
        controller: ['$state', function($state) {
            angular.extend(this, {
                $onInit() {

                    let socket = io();


                    // use the socket
                    socket.on('pseudo', (info) => {
                        this.pseudo = info

                    })

                    // Affiche celui qui vient de se copnnecter
                    socket.on('an event', (test) => {
                        this.user = test.data
                    })

                    this.submit = () => {
                        let msg = this.envoie
                        socket.emit('chat message', msg);
                        // this.message(msg)

                    };

                    socket.on('chat message', (msg) => {
                      debugger

                        this.message(msg.content, msg.pseudo)
                    });



                },
                message(msg, pseudo) {
                    debugger
                    this.content = `${msg} ${pseudo}`

                }
            })
        }]
    })
})(angular.module('app.chat'))
