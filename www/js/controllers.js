angular.module('starter')


.controller('AppCtrl', function($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS) {
  $scope.username = AuthService.username();


  $scope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
    AuthService.logout();
    $state.go('login');
    var alertPopup = $ionicPopup.alert({
      title: 'Session Lost!',
      template: 'Sorry, You have to login again.'
    });
  });

  $scope.setCurrentUsername = function(name) {
    $scope.username = name;
  };
})

.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService) {
  $scope.data = {};

  $scope.login = function(data) {
    AuthService.login(data.username, data.password).then(function(authenticated) {
      $state.go('main.dash', {}, {reload: true});
      $scope.setCurrentUsername(data.username);
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };
})


.controller('donorInfoCtrl', function($scope,  $state, $ionicModal, $http, AuthService, DonorService) {

  $scope.reasons=[{reason:"No money"}, {reason:"Not given"}, {reason:"Not familiar"}];
  $scope.stats=[{stat:"Donated"}, {stat:"Declined"}, {stat:"No Answer"}];
  $scope.Infos = [{}];

  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };

  $scope.addNewInfo = function() {
    
    $scope.Infos.push({
                      name:$scope.name,
                      bday:$scope.bday,
                      streetName: $scope.streetName,
                      city: $scope.city,
                      zip: $scope.zip,
                      mobileNumber: $scope.mobileNumber,
                      email: $scope.email,
                      status: $scope.status,
                      amount: $scope.amount                    
                      });

      var latestCount = $scope.Infos.length - 2;
      if($scope.Infos[latestCount].status == 'Donated' && $scope.Infos[latestCount].amount > 0)
      {
          var storeInfo = JSON.stringify($scope.Infos[latestCount]);
          DonorService.storeInformation(storeInfo);
          $state.go('main.donorConfirm', {}, {reload: false});
      }  
  };

  $scope.submitAll = function(){  
      var data = JSON.stringify($scope.Infos);
              
      $http.post('http://localhost:8100/saveDonorInfo', data).then(
        function(result) {
        
        }, function(err) {
          $scope.response = err;
        });    

      $scope.Infos =[{}];
  };

  $scope.removeInfo = function(Info) {
    $scope.Infos.splice($scope.Infos.indexOf(Info), 1);
  };
})


.controller('confirmCtrl', function($scope,  $state, $ionicModal, DonorService) {

   $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };

  $scope.donorData = angular.fromJson(DonorService.getDonorInformation());

  $scope.Confirmed = function(){

    $state.go('main.dash', {}, {reload: false});
  }
   
});
