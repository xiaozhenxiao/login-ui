//创建API对象，里边定义了调用后台的方法，封装了ajax请求
angular.module('pulse').factory('API', function ($http) {
    var serverUrl = "http://127.0.0.1:8080/member-api";
    var transactionUrl = "http://127.0.0.1:8089/transaction-api";
    var storageUrl = "http://localhost:8999/storage-api";
    var marketUrl = "http://127.0.0.1:8080/market-api";
    //定义后台接口url地址
    var UrlFactory = {
        test: function() {
            return "/staticData/1.json";
        },
        member: function () {
            return serverUrl + "/brand/member";
        },
        consumRecord: function () {
            return serverUrl + "/brand/consume-record";
        },
        userStatus: function () {
            return serverUrl + "/brand/userinfo";
        },
        transactionManager: function() {
            return transactionUrl + "/order";
        },
        transactionStatistics: function() {
            return transactionUrl + "/order/statistics";
        },
        statisticsIncome: function() {
            return transactionUrl + "/order/statistics/income"
        },
        statisticsTimes: function() {
            return transactionUrl + "/order/statistics/times"
        },
        statisticsOnce: function() {
            return transactionUrl + "/order/statistics/once"
        },
        statisticsCheckSrcTimes: function() {
            return transactionUrl + "/order/statistics/check_src"
        },
        marketingAct: function(){
            return marketUrl+"/activity/selectActivity";
        },
        imageUpload: function() {
            return storageUrl + "/image/upload";
        },
        creatAct: function(){
            return marketUrl +"/activity/addActivity";
        }
    };

    //调用后台接口的方法
    return {
        test: function(onSuccessHandler, onErrorHandler) {
            var url = UrlFactory.test();
            $http({
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(onSuccessHandler)
                .error(onErrorHandler)
                .finally(function() {
                    console.log('GET: ' + url);
                });
        },
        member: function(data, onSuccessHandler, onErrorHandler) {
            var url = UrlFactory.member() + "?" + data;
            $http({
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                },
            }).success(onSuccessHandler)
                .error(onErrorHandler)
                .finally(function() {
                    console.log('GET: ' + url);
                });
        },
        userInfoStatus: function(data, onSuccessHandler, onErrorHandler) {
            var url = UrlFactory.userStatus() + "?" + data;
            $http({
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                },
            }).success(onSuccessHandler)
                .error(onErrorHandler)
                .finally(function() {
                    console.log('GET: ' + url);
                });
        },
        consumRecord: function(data, onSuccessHandler, onErrorHandler) {
            var url = UrlFactory.consumRecord() + "?" + data;
            $http({
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                },
            }).success(onSuccessHandler)
                .error(onErrorHandler)
                .finally(function() {
                    console.log('GET: ' + url);
                });
        },
        transactionManager: function(params, onSuccessHandler, onErrorHandler) {
            var url = UrlFactory.transactionManager() + "?" + params;
            $http({
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(onSuccessHandler)
                .error(onErrorHandler)
                .finally(function() {
                    console.log('GET: ' + url);
                });
        },
        transactionManagerStatistics: function(params, onSuccessHandler, onErrorHandler) {
            var url = UrlFactory.transactionStatistics() + "?" + params;
            $http({
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(onSuccessHandler)
                .error(onErrorHandler)
                .finally(function() {
                    console.log('GET ' + url);
                })
        },
        statisticsIncome: function(params, onSuccessHandler, onErrorHandler) {
            var url = UrlFactory.statisticsIncome() + "?" + params;
            $http({
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(onSuccessHandler)
                .error(onErrorHandler)
                .finally(function() {
                    console.log('GET: ' + url);
                });
        },
        statisticsTimes: function(params, onSuccessHandler, onErrorHandler) {
            var url = UrlFactory.statisticsTimes() + "?" + params;
            $http({
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(onSuccessHandler)
                .error(onErrorHandler)
                .finally(function() {
                    console.log('GET: ' + url);
                });
        },
        statisticsOnce: function(params, onSuccessHandler, onErrorHandler) {
            var url = UrlFactory.statisticsOnce() + "?" + params;
            $http({
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(onSuccessHandler)
                .error(onErrorHandler)
                .finally(function() {
                    console.log('GET: ' + url);
                });
        },
        statisticsCheckSrcTimes: function(params, onSuccessHandler, onErrorHandler) {
            var url = UrlFactory.statisticsCheckSrcTimes() + "?" + params;
            $http({
                method: 'GET',
                url: url,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).success(onSuccessHandler)
                .error(onErrorHandler)
                .finally(function() {
                    console.log('GET: ' + url);
                });
        },
        market: function(parameter,onSuccessHandler, onErrorHandler){
            var url = UrlFactory.marketingAct();
            $http({
                method:'POST',
                url:url,
                params :parameter,
                headers:{
                    'Content-Type': 'application/json'
                }
            }).success(onSuccessHandler)
                .error(onErrorHandler)
                .finally(function(){
                    console.log('POST: ' + url);
                });
        },
        creatActivity: function(parameter, onSuccessHandler, onErrorHandler){
            var url = UrlFactory.creatAct();
            $http({
                method : 'POST',
                url:url,
                params :parameter,
                headers:{
                    'Content-Type': 'application/json'
                }
            }).success(onSuccessHandler)
                .error(onErrorHandler)
                .finally(function(){
                    console.log('POST: ' + url);
                });
        },
        uploadImgUrl: UrlFactory.imageUpload
    }
});
