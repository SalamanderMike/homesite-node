Crtl = angular.module('Controllers', []);

Crtl.controller('AppController', ['$scope', '$rootScope', '$http', '$timeout', '$translate', function ($scope, $rootScope, $http, $timeout, $translate) {
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


// GOOGLE MAPS
	(function() {
		$http.get('/config').then(function(response) {
			var map_auth = "https://maps.googleapis.com/maps/api/js?key="+ response.data;
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = map_auth;
			document.body.appendChild(script);
		}), function(err) {
			console.log("Could Not Find ENV Variable", err);
		};
	})();



	function initialize() {
		var location = new google.maps.LatLng(37.7749, -122.4194);
		var mapOptions = { 
			center: location,
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var marker = new google.maps.Marker({
		    position: location,
		    title:"Best City In The World!"
		});
		map = new google.maps.Map(document.getElementById('map'), mapOptions);
		marker.setMap(map);
	};
	



// SECTION: NAV-TABS
	app.tabFunction = function(tab) {
		console.time("TAB-FUNCTION");							// PERFORMANCE TESTING
		views = $scope.views;
		angular.forEach(Object.keys(views), function(page) {
			if (tab != page) {
				views[page] = false;
			} else {
				views[page] = true;
			};
		});
		if (tab === "APIS") {
			$timeout(function() {
				initialize();
			},0);
		};
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
