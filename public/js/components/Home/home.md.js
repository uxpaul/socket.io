((app) => {
    'use strict'
    app.config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('app.home', {
            url: '/home/:pseudo',
            template: '<home />'
        })
    }])

})(angular.module('app.home', ['ui.router']))
