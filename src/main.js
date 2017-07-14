import angular from 'angular'
import 'angular-ui-router'
import './css/ionic.min.css'
import './js/ionic.js'
import './js/ionic-angular.js'
import './js/angular-animate.js'
import './js/angular-sanitize.js'
import './js/ng-cordova.js'

import './css/common.scss'

import FastClick from 'fastclick'
import router from './router'
import services from './services'
import directives from './directives'

angular.module('app', ['ui.router', 'ngCordova', 'ionic', 'services']) //, 'services', 'directives'
  .config(config)
  .controller('application', application)
  .run(run)

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider']
function config ($stateProvider, $urlProvider, $locationProvider, $httpProvider) {
    $urlProvider.otherwise('/')
    $locationProvider.html5Mode({
        enabled: false,
        requireBase: false
    })
    $locationProvider.hashPrefix('!')
    // 注册路由
    Object.values(router).forEach(res => {
        if (angular.isArray(res)) {
            res.forEach(inner => {
                $stateProvider.state(inner.name, inner.param)
            })
        } else {
            $stateProvider.state(res.name, res.param)
        }
    })
}

application.$inject = ['$scope', '$state']
function application ($scope, $state) {
   
}

function run ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
        }
        if (window.StatusBar) {
            window.StatusBar.styleDefault()
        }
    })
    FastClick.attach(document.body)
}

// 注册服务
let servicesModule = angular.module('services', [])
let allowServicesType = new Set(['factory', 'provider', 'value', 'constant', 'service'])
Object.values(services).forEach(res => {
    if (res.type && allowServicesType.has(res.type)) {
        if (angular.isString(res.name) && angular.isFunction(res.fn)) {
            servicesModule[res.type](res.name, res.fn)
        }
    }
})
// 注册指令
let directivesModule = angular.module('directives', [])
Object.values(directives).forEach(res => {
    if (angular.isString(res.name) && angular.isFunction(res.fn)) {
        directivesModule.directive(res.name, res.fn)
    }
})
angular.element(document).ready(function () {
    if (window.cordova) {
        console.log('Running in Cordova, will bootstrap AngularJS once \'deviceready\' event fires.')
        document.addEventListener('deviceready', function () {
            console.log('Deviceready event has fired, bootstrapping AngularJS.')
            angular.bootstrap(document.body, ['app'])
        }, false)
    } else {
        console.log('Running in browser, bootstrapping AngularJS now.')
        angular.bootstrap(document.body, ['app'])
    }
})
