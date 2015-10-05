'use strict';

angular.module('sfc')  
	.controller('crawlmanageWebsitectrl', ['$scope', '$rootScope', '$location', 'dashboardservice', '$timeout', '$state', '$stateParams', '$http', function ($scope, $rootScope, $location, dashboardservice, $timeout, $state, $stateParams, $http) {
    
    
        if ($state.is('crawl.manageWebsite')) { 
            $scope.websites = [];
    
            $scope.name = 'Sanjay';
            
            $scope.maxSize = 5;
            
            $scope.setPage = function (pageNo) {
                //alert(pageNo)
                //$scope.currentPage = pageNo;
            };
            
            console.log($stateParams);
            //var pageNo = $stateParams.pageNo;
            
            $scope.currentPage = 1;
            
            $scope.$watch('currentPage', function(newValue, oldValue) {
                //console.log('oldvalue = ' + oldValue)
                //console.log('newValue = ' + newValue)
                loadSites(newValue);
            })
        
        } else if ($state.is('crawl.updateWebsite')) {
            var id = $stateParams.id; 
            dashboardservice.updatewebsite(id).then(function(resonse) { 
                var data = resonse.data;
                $scope.siteDetail = data;        
            })
        }
        
        
        var showalert = function(success, message) {
            if (success) {
                $scope.update = true;
                $scope.updateclass = 'alert-success';    
            } else {
                $scope.update = true;
                $scope.updateclass = 'alert-danger';    
            }
            $scope.updatemessage = message;
        
            $timeout(function() {
                $scope.update = false;
                $scope.updateclass = '';
                $scope.updatemessage = '';
            }, 2500);
        
        }
        
        $scope.cancel = function() {
            $state.transitionTo('crawl.manageWebsite');
        }
        
        $scope.save = function() {
            dashboardservice.savewebsite($scope.siteDetail).then(function(resonse) {
                var data = resonse.data;
                showalert(data.success, data.message);
            })
        }
        
        
        $scope.getCompetitorSite = function(parent_site_id) {
            
            dashboardservice.Competitor_list(parent_site_id).then(function(resonse) { 
                
                //var data = resonse.data;
                //$scope.siteDetail = data;        
            })
            
            
            alert(parent_site_id);
        } 
        
        
        
        function loadSites(pageNo) {
            $http({
                method: 'GET',
                url: 'php/website_list.php?pageNo=' + pageNo
            }).
            success(function(data, status, headers, config) {
                var p_data = data["data"]
                
                $scope.totalItems = data.totalItems;
                $scope.numPages = data.numPages;
                //alert($scope.totalItems);
                
                $scope.websites = p_data;        
            }).
            error(function(data, status, headers, config) {
                
            }) 
        }

}]);       