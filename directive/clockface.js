'use strict';

/**
 * Created by Sanjay
 * Create Directive which is used in Clock face picker/timepicker
 * It is used by commom view of application
 * and directly called by othe view template 
 *  
 **/ 
var App = angular.module('dashboardApp');

/*-- datepicker directive--*/
App.directive('clockface', function () {
    return {
        // Restrict it to be an Element in this case
        restrict: 'EA',
        scope: {
            seltime : '=seltime',
            onTimeChange: '&',
            tooltitle: '@'    
        },
        templateUrl: 'views/directive/clockface.html',
        controller: function($scope) {
            $scope.startTimeValidation = function() {
    
                var val = $scope.seltime;
                var valid = true;   
    
                if (val !== '') {
                    var time_array = val.split(' ');
                    if (time_array === '') {
                       valid = false;
                    }
                    if (time_array[0] !== undefined) {
                        var hrs_min_array = time_array[0].split(':');
                        if (hrs_min_array.length === 2) {
                            var hrs = hrs_min_array[0];
                            hrs = parseInt(hrs);
                            if (hrs > 12) {
                                valid = false;
                            } 
                            if (hrs === 0) {
                                valid = false;
                            }
                            var mins = hrs_min_array[1];
                            mins = parseInt(mins);
                            if (mins > 59) {
                                valid = false;
                            }
                        } else {
                            valid = false;
                        }
                    } else {
                        valid = false;
                    }
                    if (time_array[1] !== undefined) {
                        var time_ampm = angular.lowercase(time_array[1]); 
                        if (time_ampm !== 'am' && time_ampm !== 'pm') {
                            valid = false; 
                        } 
                    } else {
                        valid = false;
                    }     
                } else {
                    valid = false;
                } 
                
                if (valid === false) {
                     $scope.seltime = '00:00 AM';
                } 
            };
        },
        // responsible for registering DOM listeners as well as updating the DOM
        link: function (scope, element) { 
            //console.log('it is in link');
            
            var temp = element.find('.clockface_1'); 
            var options = {
                format: 'HH:mm'       
            };
            temp.clockface(options);
            
            
            var pickvalue = element.find('input[type="text"]');
       
            temp.clockface();
            temp.on('pick.clockface', function() {
                 
                 scope.$apply(function () {
                    scope.seltime = $(pickvalue).val();
                    scope.onTimeChange();
                });
            });
            
        }
    };
});
/*-- /End datepicker directive--*/
