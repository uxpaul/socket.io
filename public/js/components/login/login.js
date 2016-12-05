((app) => {
    'use strict'
    app.component('login', {
        templateUrl: 'js/components/login/login.html',
        controller: ['$state', function($state) {
            angular.extend(this, {
                $onInit() {

                    let socket = io();

                    //  let pseudo = prompt('Quel est votre pseudo ?');
                    //  socket.emit('pseudo', pseudo)

                    socket.on('connect', () => {
                        console.log('Waiting')

                        this.join = () => {

                            socket.emit('authenticate', {
                                name: this.pseudo,
                                password: this.password
                            });
                        }
                        socket.on('Try again', function() {
                            alert('Wrong pseudo/password ! Start A-G-A-I-N');
                        })

                        socket.on('authenticated', function() {
                            $state.go('app.chat', {
                                    pseudo: this.pseudo
                                })
                                // use the socket
                            socket.on('pseudo', function(info) {
                                this.pseudo = info

                            })

                            // Affiche celui qui vient de se copnnecter
                            socket.on('an event', function(test) {
                              debugger
                                this.user = test.data
                            })


                        });
                    });


                }

            })
        }]
    })
})(angular.module('app.login'))
