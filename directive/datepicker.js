'use strict';

/**
 * Created by Sanjay
 * Create Directive which is used in Datepicker
 * It is used by commom view of application
 * and directly called by othe view template 
 *  
 **/ 

var App = angular.module('dashboardApp');

/*-- datepicker directive--*/
App.directive('datepicker', function () {
    
    return {
        
        // Restrict it to be an Element in this case
        restrict: 'EA', 
        scope: {
            seldate: '=seldate',
            onDateChange: '&',
            tooltitle: '@'
        },
        templateUrl: 'views/directive/datepicker.html',
        controller: function($scope) {
            console.log($scope);
            console.log('tooltitle===' + $scope.tooltitle);
            //console.log('it is in controller');
            //console.log($scope.seldate);
            //$scope.selDate1 = $scope.seldate; 

        },
        
        // responsible for registering DOM listeners as well as updating the DOM
        link: function (scope, element) { 
            //console.log('it is in link');
            
            //var seldate = scope.seldate;
            //console.log(seldate); 
            
            var temp = element.find('.date-picker');  
            var options = {
                format: 'MM dd, yyyy',
                autoclose: true
            }; 
            
            temp.datepicker(options); 
            
            temp.on('changeDate', function(e) {
                scope.$apply(function () {
                    scope.seldate = e.date;
                    scope.onDateChange();
                });
                
            });
             
            scope.$watch('seldate', function(val) {       
                if (val === true) { //set current date
                      temp.datepicker('update', new Date());
                } else if (typeof(val) === 'string') {
                    var dtObj = new Date(val);
                    if (dtObj !== 'Invalid Date') {
                        temp.datepicker('update', dtObj);
                    }
                } else if (typeof(val) === 'object') {
                    temp.datepicker('update', val);    
                } else if (val === '') {
                    temp.datepicker('update', val);
                }
            }); 

           

        }
    };
});
/*-- /End datepicker directive--*/
