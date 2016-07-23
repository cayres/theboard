 // notesView.js
 (function (angular) {
     
     var theModule = angular.module("notesView", []);
     
     theModule.controller("notesViewController",
     ["$scope", "$window", "$http",
        function ($scope, $window, $http) {
            $scope.notes = [];
            
            
            //Get the category name
            var urlParts = $window.location.pathname.split("/");
            var categoryName = urlParts[urlParts.length -1];
            
            var notesUrl = "/api/notes/" + categoryName;
            
            $http.get(notesUrl)
                .then(function (result) {
                    console.log(result);
                    $scope.notes = result.data.notes;
                }, function (err) {
                    alert(err)
                })
            
        }
     ])
     
 })(window.angular)