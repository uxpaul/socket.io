((app) => {
    'use strict'
    app.config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        $urlRouterProvider.otherwise('/login')
        $stateProvider.state('app', {
            url: '',
            abstract: true,
            template: '<ui-view></ui-view>'
        })
    }])

  })(angular.module('app.config'))
