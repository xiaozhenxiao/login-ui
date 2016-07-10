angular
    .module('pulse')
    .controller('creatActivityCtl', creatActivityCtl);
function creatActivityCtl($scope, API, $location) {
	API.creatActivity(function(data) {
        $scope.userList = data;
    }, function(){
        alert("get data error");
    });
    $scope.detail = function(userName, userSex, userAge) {
        $scope.userDetail = {};
        $scope.userDetail.name = userName;
        $scope.userDetail.sex = userSex;
        $scope.userDetail.age = userAge;
        showDialog($scope);
    };
    $scope.close = function() {
        hideDialog($scope);
    };
}