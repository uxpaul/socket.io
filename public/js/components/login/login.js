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

                        // Si authentifier aller vers chat et passer le pseudo
                        socket.on('authenticated', function(pseudo) {
                            $state.go('app.chat', {
                                    pseudo: pseudo
                                })

                        });
                    });


                }

            })
        }]
    })
})(angular.module('app.login'))
