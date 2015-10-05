
(function () {
    angular
        .module('XXXXX')
        .controller('AddMeasurement', AddMeasurement);
        
        AddMeasurement.$inject = ['$scope', 'vars', 'qsService', 'myBroadcast', 'ccpMeasurement', 'sharedData'];
        
        function AddMeasurement($scope, vars, qsService, myBroadcast, ccpMeasurement, sharedData) {
            var vm = this;
            var selectedCCP = sharedData.getSelectedCCP();
            
            var ccpId = selectedCCP.id; 
            
            var userId = vars.getUserID();
            
            vm.cancelMeasurement = cancelMeasurement;
            vm.saveMeasurement = saveMeasurement;
            vm.openCal = openCal;
            vm.getCurrentTime = getCurrentTime;
            
            function openCal($event) {
                $event.preventDefault();
                $event.stopPropagation();
                vm.opened = true;
            }
            
            vm.format = 'dd/MM/yyyy';
                            
            function strpad(val) {
                if (val < 10) {
                    return '0' + val;
                } else {
                    return val;
                }
            }
            
            function saveMeasurementSuccess(measurementData) {
                var loadmeasurement = true;
                myBroadcast.closeMeasurementModel();
                
                //check the critical values are not null
                if (selectedCCP.criticalValueMin !== null && selectedCCP.criticalValueMax !== null) {
                    // check if the measurement values if outside of critical values or not
                    if (measurementData.measurementValue < selectedCCP.criticalValueMin ||  measurementData.measurementValue > selectedCCP.criticalValueMax) {
                        //if it is outside of critical value than open a new popup
                        //$scope.openNonComplianceModel(measurementData);
                        
                        sharedData.setMeasurementData(measurementData);
                        myBroadcast.openNonComplianceModel();
                        loadmeasurement = false;    
                    }
                }
                
                if (loadmeasurement) {
                    myBroadcast.reloadmeasurement();
                }
                
            }
            
            function saveMeasurementFailure(data) {
                myBroadcast.closeMeasurementModel();
            }
            
            function getCurrentTime() {
                var time = new Date();
            
                var hours = time.getHours();
                    hours = strpad(hours); 
                    
                var minutes = time.getMinutes();
                    minutes = strpad(minutes); 
        
                var seconds = time.getSeconds();
                    seconds = strpad(seconds);
                
                var str = hours + ':' + minutes + ':' + seconds;
                return str; 
            }

            function saveMeasurement() {
                
                var dateObj = vm.measurement.measurementTime;
                var month = dateObj.getMonth() + 1;
                    month = strpad(month);
                var date = dateObj.getDate(); 
                    date = strpad(date);
        
                var time = getCurrentTime(); 
                var measurementTime = dateObj.getFullYear() + '-' + month + '-' + date + 'T' + time; 
                                    
                var postdata = {
                    'measurementValue': vm.measurement.measurementValue,
                    'measurementTime': measurementTime,
                    'ccpId': ccpId,
                    'userId': userId
                };
                
                //console.log('postdata'); console.log(postdata);
                
                var measurementpromise = ccpMeasurement.save(postdata, 'Add');
                measurementpromise.then(saveMeasurementSuccess, saveMeasurementFailure);
                
            } //end of saveMeasurement
                            

            function cancelMeasurement() {
                myBroadcast.closeMeasurementModel();    
            }

        
        } //end of AddMeasurement
})();