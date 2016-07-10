angular
	.module('pulse')
	.controller('activityDetailsCtl',activityDetailsCtl);
function activityDetailsCtl($scope, API, $location){
	API.market(function(data) {
        $scope.userList = data;
    }, function(){
        alert("get data error");
    });
	$scope.tab=function(tab){
		switch(tab) {
		case 'a':
			$scope.aisActive = true;
			$scope.bisActive = false;
			$scope.cisActive = false;
			break;
		case 'b':
			$scope.aisActive = false;
			$scope.bisActive = true;
			$scope.cisActive = false;
			break;
		case 'c':
			$scope.aisActive = false;
			$scope.bisActive = false;
			$scope.cisActive = true;
			break;
		}
		
	};
    $scope.showdialog=function(a){
    	$scope.model_style_edit = {display:'block'};
    	if(a==0){
    		$scope.model_in_edit_fb = true;
    	}else{
    		$scope.model_in_edit_xj = true;
    	}
    };
    
    $scope.close=function (){
        $scope.model_style_edit = {display:'none'};
        $scope.model_in_edit_fb = false;
        $scope.model_in_edit_xj = false;
    };
	/*-== 时间控件start ==-*/
    var beginTime = $("#datetime_begin");
    var endTime = $("#datetime_end");
    //初始化日期时间控件
    beginTime.datetimepicker({
        format: 'Y-m-d H:00',
        lang: 'ch',
        onShow: function() {
        }
    });
    endTime.datetimepicker({
        format: 'Y-m-d H:00',
        lang: 'ch',
        onShow: function() {
        }
    });
    /*-== 时间控件结束 ==-*/
}

