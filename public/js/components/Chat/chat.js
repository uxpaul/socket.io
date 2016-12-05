((app) => {
    'use strict'
    app.component('chat', {
        templateUrl: 'js/components/chat/chat.html',
        controller: ['$state','$stateParams', function($state, $stateParams) {
            angular.extend(this, {
                $onInit() {

                    let socket = io();
                    let pseudo = $stateParams.pseudo

                    // use the socket
                    socket.emit('pseudo', $stateParams.pseudo )


                    // Affiche celui qui vient de se copnnecter
                    socket.on('an event', (test) => {
                        this.user = test.data
                    })

                    this.submit = () => {
                        let msg = this.envoie
                        socket.emit('chat message', msg);
                         this.message(msg, pseudo)

                    };

                    socket.on('chat message', (msg) => {
                        this.message(msg.content, msg.pseudo)
                    });



                },
                message(msg, pseudo) {
                  this.content = {}
                  this.content.pseudo = pseudo
                  this.content.msg = msg
                  this.contenus = []
                  this.contenus.push(this.content)
                }
            })
        }]
    })
})(angular.module('app.chat'))
