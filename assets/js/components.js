Component = angular.module('Components', []);

Component.directive('drawer', function() {									// SLIDING SIDE MENU DIRECTIVES
	return {
		template: "<div ng-class='{ show: visible }' ng-transclude></div>",
		scope: {
			visible: '='
		},
		restrict: 'E',
		transclude: true
	};
});

Component.directive('currentTime', function ($interval, dateFilter) {		// TIME & DATE DIRECTIVE
	return function (scope, element, attrs) {
		var format,
			tickTock;

		function updateTimeAndFormat() {
			element.text(dateFilter(new Date(), format));
		}

		scope.$watch(attrs.currentTime, function (value) {				// WATCH THE ATTRIBUTES ASSOCIATED WITH THE DIRECTIVE: currentTime
			format = value;												// AND CHANGE THE VALUE OF THE FORMAT IF THERE IS A CHANGE
			updateTimeAndFormat();										// THEN CALL THE updateTimeAndFormat() FUNCTION
		});

		element.on('$destroy', function() {								// !!!PREVENT MEMORY LEAKS BY LISTENING FOR $destroy
			$interval.cancel(tickTock);
		});

		tickTock = $interval(function() {								// SET INTERVAL EVERY 1 SECOND TO CALL THE updateTimeAndFormat FUNCTION
			updateTimeAndFormat();
		}, 1000);
	}
});

Component.directive('autoFocus', function ($timeout) {					// AUTOFOCUS INPUT FIELD ON PAGE LOAD
    return function postLink(scope, element, attrs) {
        $timeout(function() {
			element[0].focus();
		});
    }
});
Component.directive('focusField', function ($timeout) { 				// INPUT FIELD FOCUS ON CLICK
    return function (scope, element, attrs) {
        scope.$watch(attrs.focusField, function (value) {
            if (value) $timeout(function() {element[0].focus();} );
        });
    }
});


// KEEPING THIS HERE BECAUSE I LIKE IT AND MAY USE IT SOMETIME
// .directive('responsive', function ($window) {								// APPLY TEMPLATE AT BREAKPOINTS FOR RESPONSIVE DESIGN
// 	return {																	// MAY USE THIS FOR EXTENSIVE SMALL VIEWPORT CHANGES
// 		template: "<div ng-include='template'></div>",							
// 		scope: {},
// 		link: function postLink(scope, element, attrs, AppController) {
// 			function checkBreaks() {
// 				var curBreak = $window.innerWidth,
// 					template = attrs.responsive,
// 					smBreak = parseInt(attrs.smbreak),
// 					mdBreak = parseInt(attrs.mdbreak);	

// 				if (smBreak && curBreak < smBreak) {
// 					curBreak = smBreak;
// 					template = attrs.smtemplate;
// 				} else if (mdBreak && curBreak < mdBreak) {	
// 					curBreak = mdBreak;
// 					template = attrs.mdtemplate
// 				}
				
// 				if (curBreak != scope.break) {									// FEED BACK TO SCOPE
// 					scope.break = curBreak;
// 					scope.template = template;
// 				}
// 			};

// 			checkBreaks(element[0].clientWidth);								// CHECK WINDOW SIZE

// 			$window.onresize = function() {										// WHEN RESIZING WINDOW,
// 				scope.$apply(function(){checkBreaks(element[0].clientWidth)});	// $apply TO SEND TO ANGULAR

// 			};
// 		}
// 	};
// })
