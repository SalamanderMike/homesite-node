Crtl = angular.module('Controllers', []);

Crtl.controller('AppController', ['$scope', '$rootScope', '$translate', function ($scope, $rootScope, $translate) {
	var app = this;
	$scope.languages = ['中国（简体)','English'];
	$scope.focusFocus = false;
	$scope.views = {
		INTRO: 		true,
		PROJECTS: 	false,
		APIS: 		false,
		HISTORY: 	false,
		LOCALE: 	false
	};


// TEST AREA (HARD HAT REQUIRED)
// END OF TEST AREA


// SECTION: NAV-TABS
	app.tabFunction = function(tab) {
		console.time("TAB-FUNCTION");							// PERFORMANCE TESTING
		views = $scope.views;
		angular.forEach(Object.keys(views), function (page) {
			if (tab != page) {
				views[page] = false;
			} else {
				views[page] = true;
			};
		});
		$scope.views = views;
		console.timeEnd("TAB-FUNCTION");						// PERFORMANCE TESTING
	};




// SLIDING SIDE MENU
	$scope.leftVisible = false;
	$scope.rightVisible = false;

	app.close = function() {
		$scope.leftVisible = false;
		$scope.rightVisible = false;
	};

	app.showLeft = function(e) {
		$scope.leftVisible = true;
		e.stopPropagation();
	};

	app.showRight = function(e) {
		$scope.rightVisible = true;
		e.stopPropagation();
	};

	$rootScope.$on("documentClicked", _close);
	$rootScope.$on("escapePressed", _close);

	function _close() {
		$scope.$apply(function() {
			app.close(); 
		});
	};







// SECTION: TRANSLATION
	app.chooseLanguage = function (lang) {
		console.time("LOCALIZE-FUNCTION");							// PERFORMANCE TESTING
		if (lang === "中国（简体)") {
			$translate.use('zhCN');
		} else if (lang === "English") {
			$translate.use('enUS');
		};
		console.timeEnd("LOCALIZE-FUNCTION");						// PERFORMANCE TESTING
	};
}]);

Crtl.controller('DateCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
	$scope.disable = true;											// DISABLE TODO AND DATE EDIT FUNCTIONALITY
	$scope.format = 'M/d/yyyy h:mm:ss a';							// DATE AND TIME FORMAT
	$scope.languages = ['中国（简体)','English'];
}]);
