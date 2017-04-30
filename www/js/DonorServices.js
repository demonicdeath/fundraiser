angular.module('starter')

.service('DonorService', function($q, $http) {
  var LOCAL_TOKEN_KEY = 'donorToken';

  function loadDonorInformation() {
   return window.localStorage.getItem(LOCAL_TOKEN_KEY);   
  }

  function storeDonorInformation(donorInfo) {    
    window.localStorage.setItem(LOCAL_TOKEN_KEY, donorInfo);
  }

  function clearDonorInformation() {
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

  var storeInformation = function(donorInfo) {
    return $q(function(resolve) {     
        storeDonorInformation(donorInfo);
        resolve('Data Stored success.');
      })
  };

var getDonorInformation = function() {    
  return loadDonorInformation();
  };

  var clearDonorInformation = function() {
    clearDonorInformation();
  };

  return {
    getDonorInformation: getDonorInformation,
    storeInformation: storeInformation,  
    clearDonorInformation: clearDonorInformation
  };

})




