Router = angular.module('Router', ['ngRoute', 'ngSanitize', 'pascalprecht.translate']);


Router.config(function ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			title:          'Michael',
			templateUrl:    'site',
			controller:     'AppController',
			controllerAs:   'app'
		})
		.when('/test', {
			title:          'Test',
			templateUrl:    'site',
			controller:     'DateCtrl',
			controllerAs:   'app'
		})
		.otherwise({
			redirectTo: "/"
		});
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});

Router.config(function ($translateProvider) {
	$translateProvider
	.useStaticFilesLoader({
		prefix: '/locales/',
		suffix: '.json'
	})
	.registerAvailableLanguageKeys(['enUS', 'zhCN'])
	.preferredLanguage('enUS')
	.fallbackLanguage('enUS')
	.determinePreferredLanguage()
	.useSanitizeValueStrategy('escapeParameters');
});

Router.run(function ($location, $rootScope) {
	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
		if (current.hasOwnProperty('$$route')) {
			$rootScope.title = current.$$route.title;
		}
	});
});
// SLIDING SIDE MENU
// LISTEN FOR CLICK TO CLOSE DRAWER
Router.run(function ($rootScope) {
	document.addEventListener('keyup', function (e) {                               	
		if (e.keyCode === 27) $rootScope.$broadcast('escapePressed', e.target);
	});

	document.addEventListener('click', function (e) {
		$rootScope.$broadcast('documentClicked', e.target);
	});
});

Router.config(function ($httpProvider) {
		return $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
	}
);
