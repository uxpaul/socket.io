((app) => {
    'use strict'
    app.component('login', {
        templateUrl: 'js/components/login/login.html',
        controller: ['$state', function( $state) {
            angular.extend(this, {
                $onInit() {

                     let socket = io();

                    //  let pseudo = prompt('Quel est votre pseudo ?');
                    //  socket.emit('pseudo', pseudo)

                     socket.on('connect', ()=> {
                       console.log('Waiting')
                       this.join = ()=>{
                         debugger
                         socket.emit('authenticate', {
                             name: this.pseudo,
                             password: this.password
                         });
                       }
                         socket.on('Try again', function() {
                             prompt('No pseudo ! Start A-G-A-I-N');
                         })

                         socket.on('authenticated', function() {
                             // use the socket
                             socket.on('pseudo', function(info) {
                                 document.getElementById('connection').innerHTML = `<h4>  ${info} <h4>`

                             })

                             socket.on('an event', function(test) {
                                 document.getElementById('connection').innerHTML = `<em>  ${test.data} <em>`
                             })

                             $('form').submit(function() {
                                 let msg = document.getElementById('m').value
                                 socket.emit('chat message', msg);
                                 message(msg, pseudo)
                                 document.getElementById('m').value = '';
                                 return false; // bloque l'envoie du formulaire
                             });

                             socket.on('chat message', function(msg) {
                                 message(msg.content, msg.pseudo)
                             });



                         });
                     });


                    // this.join = ()=>{
                    //   if(this.pseudo)
                    //   $state.go('app.home', {pseudo: this.pseudo})
                    // }


                }
            })
        }]
    })
})(angular.module('app.login'))
