(function(){
	var app = angular.module('mysnapchat', ['ionic']);

	app.controller('UserController', function($scope, $http){
		
		$scope.register = function(){
			console.log("ca marche");
			$http.post('http://remikel.fr/api.php?option=inscription', {'password' : $scope.password, 'email' : $scope.email}).
			
			success(function(data, status, headers, config) {
			$scope.caca = "pouet";
				console.log(data);
			}).
			
			error(function(data, status, headers, config) {
				console.log("la requete n'est pas bonne");
			});
		}
	});

	app.controller('LoginController', function($scope, $http, $window) {
		
		$scope.login = function(){
			console.log("ok");
			$http.post('http://remikel.fr/api.php?option=connexion', {'password' : $scope.password, 'email' : $scope.email}).

			success(function(data, status, headers, config) {
				console.log(data);
				$window.localStorage['token'] = data.token;
				$window.localStorage['username'] = data.username;
				
				if (data.error != false) {
					$scope.erreur = data.error;
				};

			}).
			
			error(function(data, status, headers, config) {
				console.log("pas ok");
			});
		}		
	});

	app.config(function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/');
		
		$stateProvider
			.state('accueil', {
				url: '/',
				templateUrl: 'vues/connexion.html',
			})

			.state('inscription', {
				url: '/inscription',
				templateUrl: 'vues/inscription.html',
			})

			.state('connexion', {
				url: '/connexion',
				templateUrl: 'vues/connexion.html',
			})
	});
})();