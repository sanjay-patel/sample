'use strict';

/**
 * Created by Sanjay
 * Create Directive which is used to show the Tooltip
 *  
 **/ 

var App = angular.module('dashboardApp');

/*-- datepicker directive--*/
App.directive('tooltip', function ($translate) {
    
    return {
        
        // Restrict it to be an Element in this case
        restrict: 'A', 
        scope: {
            tooltipTitle: '@tooltipTitle',
            tooltipPlacement: '@tooltipPlacement'
        },
        
        controller: function($scope) {
            $scope.title = '';
            $translate([$scope.tooltipTitle]).then(function(translations){
                $scope.title = translations[$scope.tooltipTitle];
            });
            
        },
        // responsible for registering DOM listeners as well as updating the DOM
        link: function (scope, element) { 
            
            var placement = scope.tooltipPlacement || 'top';
            scope.$watch('title', function(val) { 
                var options = {
                    'title': val,
                    'placement': placement
                };
                
                element.tooltip(options);
            });

        } //end of link function
    };
});
/*-- /End datepicker directive--*/
