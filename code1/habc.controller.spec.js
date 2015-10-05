
(function(){
    'use strict';
    
    describe('habc controller', function() {
        
        var httpBackend, scope, riskanalysis, vars, hostname, location;
        var $toast = window.toastr;
        
        beforeEach(function() {
            module('XXXXX');
            
            inject(function($httpBackend, $rootScope, $controller, $http, $resource, $location, _riskanalysis_, _vars_) {
                httpBackend = $httpBackend;
                riskanalysis = _riskanalysis_;
                scope = $rootScope.$new();
                location = $location;
                vars = _vars_;
                hostname = vars.getHostName(); 
                
                $controller('abc', {
                    $scope: scope,
                    $http: $http
                });
                
                var returnData = [
                    {'id': 'dc2871f8-81d7-459e-b812-69791a559f4f', 'userId': '0d4a8b61-efd0-4c17-874b-339c813e17e7','name': 'Lasagne','description': 'Test opskrift1'},
                    {'id': 'a68cdb7c-fa25-4463-b347-872de3dfd2ca', 'userId': '0d4a8b61-efd0-4c17-874b-339c813e17e7', 'name': 'test1', 'description': 'test1'    }
                ];
                  
                httpBackend.whenGET('views/ui.html').respond(200, {});
                httpBackend.whenGET(hostname + 'Api/riskAnalysis/getAll').respond(200, returnData);
            });
        });
        
        it('Service should contain CRUD functions', function() {
            expect(angular.isFunction(riskanalysis.get)).toBe(true);
            expect(angular.isFunction(riskanalysis.getAll)).toBe(true);
            expect(angular.isFunction(riskanalysis.query)).toBe(true);
            expect(angular.isFunction(riskanalysis.save)).toBe(true);
            expect(angular.isFunction(riskanalysis.remove)).toBe(true);
        });
        
        it('Load the riskanalysis data', function() {

            httpBackend.flush();

            var gridData = scope.riskAnalysisGridOptions.data;
            var dataCount = gridData.length;
            expect(dataCount).toEqual(2); 
            
        });
        
        it('riskanalysis with failure 400 response code', function() {
            
            //clear the previous toastr
            $('#toast-container').remove();
            
            httpBackend.expectGET(hostname + 'Api/riskAnalysis/getAll').respond(400, {});
            httpBackend.flush();
            
            var toasterHtml = $toast.getContainer().html();
            var pos = toasterHtml.indexOf('toast-error');
            expect(pos).toBeGreaterThan(0);
            
        });
        
        
        
    });
    
    
})();