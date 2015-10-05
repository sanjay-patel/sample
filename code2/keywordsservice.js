'use strict';

angular.module('sfc')
	.service('keywordsservice', ['$http', '$timeout', function ($http, $timeout) {
        
        return {
            getsiteCombo: function () {
                var url = 'php/site_combo.php';
				return $http({
					    url: url,
					    method: 'GET',
					    params: { }
					}).then(
					function(response) {
						return response;
					},function() { return []; }
				);
            },
            saveNewKeyword: function(model) {
                var url = 'php/saveNewKeyword.php';
				return $http({
					    url: url,
					    method: 'POST',
					    //params:$.param(model),
                        data: $.param(model),
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' } 
					}).then(
					function(response) {
						return response;
					},function() { return []; }
				);
            },
            
        };
    }]);