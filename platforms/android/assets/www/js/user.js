/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define */
var angular;
var error;
var navigator;
(function () {
    "use strict";
    var app = angular.module('mysnapchat', ['ionic']);
    app.controller('UserController', function ($scope, $http) {
        $scope.register = function () {
            $http.post('http://remikel.fr/api.php?option=inscription', {'password' : $scope.password, 'email' : $scope.email}).
                success(function (data) {
                    $scope.caca = data.error;
                }).
                error(function (data) {
                    $scope.caca = data.error;
                });
        };
    });
    app.controller('LoginController', function ($scope, $http, $window, $location) {
        $scope.login = function () {
            $http.post('http://remikel.fr/api.php?option=connexion', {'password' : $scope.password, 'email' : $scope.email}).
                success(function (data) {
                    console.log(data);
                    $window.localStorage.token = data.token;
                    $window.localStorage.email = $scope.email;
                    if (data.error !== false) {
                        $scope.erreur = data.error;
                    } else {
                        $location.path('/snapchat');
                    }
                }).
                error(function (data) {
                    $scope.truc = data.error;
                });
        };
    });
    app.controller('FriendController', function ($scope, $http, $window) {
        $http.post('http://remikel.fr/api.php?option=toutlemonde', {'token' : $window.localStorage.token, 'email' : $window.localStorage.email}).
            success(function (data) {
                $scope.username = data.data;
                $scope.friends = data.data.length;
            }).
            error(function (data) {
                $scope.truc = data.error;
            });
    });
    app.factory('Camera', ['$q', function ($q) {
        return {
            getPicture: function (options) {
                var q = $q.defer();
                navigator.camera.getPicture(function (result) {
                    q.resolve(result);
                }, function (err) {
                    q.reject(err);
                }, options);
                return q.promise;
            }
        };
    }]);
    app.controller('SnapController', function ($scope, $http, $window, Camera) {
        $scope.snap = function () {
            Camera.getPicture().then(function (imageURI) {
                console.log(imageURI);
            }, function (err) {
                console.err(err);
            });
            $http.post('http://remikel.fr/api.php?option=image', {'token' : $window.localStorage.token, 'email' : $window.localStorage.email}).
                success(function (data) {
                }).
                error(function (data) {
                    $scope.truc = data.error;
                });
        };
    });
    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('accueil', {
                url: '/',
                templateUrl: 'vues/connexion.html'
            })
            .state('inscription', {
                url: '/inscription',
                templateUrl: 'vues/inscription.html'
            })
            .state('snapchat', {
                url: '/snapchat',
                templateUrl: 'vues/snapchat.html'
            })
            .state('connexion', {
                url: '/connexion',
                templateUrl: 'vues/connexion.html'
            });
    });
}());