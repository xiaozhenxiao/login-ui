var filterLeftOptions = [];
angular
    .module('pulse')
    .controller('testCtl', testCtl);
function testCtl($scope, API, $location) {
    $scope.right_all_btn = {"display": "block"};
    $scope.right_inverse_btn = {"display": "block"};
    $scope.left_all_btn = {"display": "block"};
    $scope.left_inverse_btn = {"display": "block"};
    $scope.leftData = {};
    $scope.leftData.availableOptions = [
        {id: 1, name: "测试第一条"},
        {id: 2, name: "测试第二条"},
        {id: 3, name: "测试第三条"},
        {id: 4, name: "测试第四条"},
        {id: 5, name: "测试第五条"},
        {id: 6, name: "测试第六条"},
        {id: 7, name: "测试第七条"},
        {id: 8, name: "测试第八条"},
        {id: 9, name: "测试第九条"},
        {id: 10, name: "测试第十条"},
        {id: 11, name: "测试第十一条"},
        {id: 12, name: "测试第十二条"},
        {id: 13, name: "测试第十三条"},
        {id: 14, name: "测试第十四条"},
        {id: 15, name: "测试第十五条"},
        {id: 16, name: "测试第十六条"},
        {id: 17, name: "测试第十七条"},
        {id: 18, name: "测试第十八条"},
        {id: 19, name: "测试第十九条"},
        {id: 20, name: "测试第二十条"}
    ];
    $scope.leftFilter = "";
    $scope.rightFilter = "";
    $scope.leftData.selectedOptions = [];
    $scope.rightData = {};
    $scope.rightData.availableOptions = [];
    $scope.rightData.selectedOptions = [];
    $scope.moveOptions = function(from, to, all, inverse) {
        var availableOptionsTmp = from.availableOptions.slice();
        for( var i=0;i<availableOptionsTmp.length;i++) {
            var data = availableOptionsTmp[i];
            var selectedIndex = all?i:from.selectedOptions.indexOf(data.id);
            var availableIndex = from.availableOptions.indexOf(data);
            if ((selectedIndex > -1 && !inverse) || selectedIndex == -1 && inverse) {
                from.availableOptions.splice(availableIndex, 1);
                to.availableOptions.push(data);
            }
        }
    };
    API.test(function(data) {
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
function showDialog($scope) {
    $scope.model_background_style = {'z-index': 1040,display:'block'};
    $scope.model_background_in = true;
    $scope.model_style_edit = {display:'block'};
    $scope.model_in_edit = true;
}
function hideDialog($scope) {
    $scope.model_background_style = {'z-index': 1040,display:'none'};
    $scope.model_background_in = false;
    $scope.model_style_edit = {display:'none'};
    $scope.model_in_edit = false;
}