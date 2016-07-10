angular
    .module('pulse')
    .controller('creatActivityCtl', creatActivityCtl);
function creatActivityCtl($scope, API, $location) {
//	API.creatActivity(function() {
//        
//    }, function(){
//        alert("get data error");
//    });
	
	$scope.creatAct=function(){
		var actType = $("#actType").val();//活动类型
		var actName = $("#actName").val();//活动名称
		var issueNum = $("#issueNum").val();//发放数量
		var amount = $("#amount").val();//满足金额
		var privilege = $("#privilege").val();//优惠金额
		var actObject = $("#actObject").val();//活动对象
		var startTime = $("#datetime_begin").val();//开始时间
		var endTime = $("#datetime_end").val();//结束时间
		var details = $("#details").val();//活动说明
		
		if(actType==0){
			alert("活动类型不能为空");
			return;
		}
		if(actName==""){
			alert("活动名称不能为空");
			return;
		}
		
		if(amount==""){
			alert("满足金额不能为空");
			return;
		}
		if(privilege==""){
			alert("减免金额不能为空");
			return;
		}
		if(actObject==0){
			alert("活动对象不能为空");
			return;
		}
		if(startTime==""){
			alert("开始时间不能为空");
			return;
		}
		if(endTime==""){
			alert("结束时间不能为空");
			return;
		}
		if(details==""){
			alert("活动说明不能为空");
			return;
		}
		
		var parameter={actType:actType, actName:actName, issueNum:issueNum, amount:amount, privilege:privilege, actObject:actObject, startTime:startTime, endTime:endTime, details:details};
		API.creatActivity(parameter, function(data){
			alert(data);
		}, function(){
			alert("error:添加失败");
		});
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