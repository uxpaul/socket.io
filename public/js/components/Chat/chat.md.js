((app) => {
    'use strict'
    app.config(['$stateProvider', ($stateProvider) => {
        $stateProvider.state('app.chat', {
            url: '/chat/:pseudo',
            template: '<chat />'
        })
    }])

})(angular.module('app.chat', ['ui.router']))
