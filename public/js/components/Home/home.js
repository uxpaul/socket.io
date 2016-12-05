((app) => {
    'use strict'
    app.component('home', {
        templateUrl: 'js/components/home/home.html',
        controller: ['$stateParams', function($stateParams) {
            angular.extend(this, {
                $onInit() {

                  let socket = io();

                },
                emergency(emergency) {
                    this.content = emergency
                }
            })
        }]
    })
})(angular.module('app.home'))
