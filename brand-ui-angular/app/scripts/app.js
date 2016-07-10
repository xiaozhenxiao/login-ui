/**
 * 初始化
 *
 */

$(document).ready(function () {
    $('.splash').css('display', 'none');
    //根据window高度调整content的高度
    setTimeout(function () {
        fixWrapperHeight();
    }, 300);
    //根据页面宽度自动调整菜单栏收起打开状态
    setBodySmall();
});
var menuToggled = '0';
var pulseApp = angular.module('pulse', ['ui.router', 'ui.bootstrap']);
overrideHttp(pulseApp);
pulseApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, ngModel) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(event){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
                //附件预览
                scope.file = (event.srcElement || event.target).files[0];
                scope.getFile();
            });
        }
    };
}]);
pulseApp.factory('fileReader', ["$q", "$log", function($q, $log){
    var onLoad = function(reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.resolve(reader.result);
            });
        };
    };

    var onError = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.reject(reader.result);
            });
        };
    };

    var getReader = function(deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        return reader;
    };

    var readAsDataURL = function (file, scope) {
        if (file) {
            var deferred = $q.defer();
            var reader = getReader(deferred, scope);
            reader.readAsDataURL(file);
            return deferred.promise;
        }
        return;
    };

    return {
        readAsDataUrl: readAsDataURL
    };
}]);
pulseApp.controller("appCtrl", function($scope, $location, API, $state, $stateParams, $filter) {
    $scope.$watch('$viewContentLoaded', function() {
        setTimeout(function () {
            fixWrapperHeight();
        }, 10);
    });
    //菜单打开收起状态初始化
    var o = $.AdminLTE.options;
    /* PushMenu()
     * ==========
     * Adds the push menu functionality to the sidebar.
     *
     * @type Function
     * @usage: $.AdminLTE.pushMenu("[data-toggle='offcanvas']")
     */
    $.AdminLTE.pushMenu.activate = function (toggleBtn) {
        //Get the screen sizes
        var screenSizes = $.AdminLTE.options.screenSizes;

        //Enable sidebar toggle
        //$(toggleBtn).on('click', function (e) {
        $(document).on("click", toggleBtn,  function (e) {
            e.preventDefault();
            //Enable sidebar push menu
            var url = document.URL;
            if ($(window).width() > (screenSizes.sm - 1)) {
                if ($("body").hasClass('sidebar-collapse')) {
                    $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
                    if (url.indexOf("menuToggled")>-1) {
                        url = url.replace("menuToggled=1", "menuToggled=0");
                    } else {
                        if (url.indexOf("?")>-1) {
                            url += "&menuToggled=0";
                        } else {
                            url += "?menuToggled=0";
                        }
                    }
                } else {
                    $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
                    if (url.indexOf("menuToggled")>-1) {
                        url = url.replace("menuToggled=0", "menuToggled=1");
                    } else {
                        if (url.indexOf("?")>-1) {
                            url += "&menuToggled=1";
                        } else {
                            url += "?menuToggled=1";
                        }
                    }
                }
                location.href=url;
            }

            //Handle sidebar push menu for small screens
            else {
                if ($("body").hasClass('sidebar-open')) {
                    $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
                } else {
                    $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
                }
            }
        });

        $(".content-wrapper").click(function () {
            //Enable hide menu when clicking on the content-wrapper on small screens
            if ($(window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
                $("body").removeClass('sidebar-open');
            }
        });

        //Enable expand on hover for sidebar mini
        if ($.AdminLTE.options.sidebarExpandOnHover || ($('body').hasClass('fixed') && $('body').hasClass('sidebar-mini'))) {
            this.expandOnHover();
        }
    };

    //Activate sidebar push menu
    if (o.sidebarPushMenu) {
        $.AdminLTE.pushMenu.activate(o.sidebarToggleSelector);
    }
    //获取url参数
    var search = $location.search();
    //过滤条件参数
    var mToggled = search["menuToggled"];
    menuToggled = (mToggled && mToggled != "")?mToggled:"0";
    toggleMenu(menuToggled);
});
//定义函数configState将url与controller绑定
function configState($stateProvider, $urlRouterProvider, $compileProvider) {

    // Optimize load start with remove binding information inside the DOM element
    $compileProvider.debugInfoEnabled(true);

    // Set default state
    $urlRouterProvider.otherwise("/sorttable");
    $stateProvider
        .state('test', {
            url: "/test",
            templateUrl: "views/test.html",
            controller: "testCtl",
            data: {
                pageTitle: 'Test'
            }
        })
        .state('sorttable', {
            url: "/sorttable",
            templateUrl: "views/sorttable.html",
            controller: "sorttableCtl",
            data: {
                pageTitle: 'sorttable'
            }
        })
        .state('member', {
            url: "/member",
            templateUrl: "views/member.html",
            controller: "memberCtl",
            data: {
                pageTitle: 'Member'
            }
        })
        .state('memberDetail', {
            url: "/memberDetail",
            templateUrl: "views/memberDetail.html",
            controller: "memberDetailCtl",
            data: {
                pageTitle: 'memberDetail'
            }
        })
        .state('transaction-manager', {
            url: "/transaction-manager",
            templateUrl: "views/transaction/transaction-manager.html",
            controller: "transactionManagerCtl",
            data: {
                pageTitle: 'transactionManager'
            }
        })
        .state('transaction-statistics', {
            url: "/transaction-statistics",
            templateUrl: "views/transaction/transaction-statistics.html",
            controller: "transactionStatisticsCtl",
            data: {
                pageTitle: 'transactionStatistics'
            }
        })
        .state('marketingActivity', {
            url: "/marketingActivity",
            templateUrl: "views/activity/marketingActivity.html",
            controller: "marketingActCtl",
            data: {
                pageTitle: 'marketingActivity1'
            }
        })
        .state('activityDetails', {
            url: "/activityDetails",
            templateUrl: "views/activity/activityDetails.html",
            controller: "activityDetailsCtl",
            data: {
                pageTitle: 'marketingActivity1'
            }
        })

        .state('file-example', {
            url: "/file-example",
            templateUrl: "views/file-example.html",
            controller: "fileExampleCtl",
            data: {
                pageTitle: 'fileExample'
            }
        })

        .state('creat-activity', {
            url: "/creat-activity",
            templateUrl: "views/activity/creatActivity.html",
            controller: "creatActivityCtl",
            data: {
                pageTitle: 'marketingActivity1'
            }
        })
}

pulseApp.config(configState).run(function($rootScope, $state) {
    $rootScope.$state = $state;
});
function overrideHttp(app) {
    app.config(function($httpProvider) {
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

        // 重写$http,使post和get默认参数为form表单格式
        $httpProvider.defaults.transformRequest = [function(data) {
            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function(obj) {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i;

                for (name in obj) {
                    value = obj[name];

                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + '='
                            + encodeURIComponent(value) + '&';
                    }
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };

            return angular.isObject(data) && String(data) !== '[object File]'
                ? param(data)
                : data;
        }];
    });
}
//自定义jquery方法，转换时间格式
(function($) {
    $.extend({
        myTime: {
            /**
             * 当前时间戳
             * @return <int>        unix时间戳(秒)
             */
            UnixTime: function(hours){
                hours = hours?hours:0;
                return Date.parse(new Date())/1000 + hours*60*60;
            },
            /**
             * 日期 转换为 Unix时间戳
             * @param <string> 2014-01-01 20:20:20  日期格式
             * @return <int>        unix时间戳(秒)
             */
            DateToUnix: function(string) {
                var f = string.split(' ', 2);
                var d = (f[0] ? f[0] : '').split('-', 3);
                var t = (f[1] ? f[1] : '').split(':', 3);
                return (new Date(
                        parseInt(d[0], 10) || null,
                        (parseInt(d[1], 10) || 1) - 1,
                        parseInt(d[2], 10) || null,
                        parseInt(t[0], 10) || null,
                        parseInt(t[1], 10) || null,
                        parseInt(t[2], 10) || null
                    )).getTime() / 1000;
            },
            /**
             * 时间戳转换日期
             * @param <int> unixTime    待时间戳(秒)
             */
            UnixToDate: function(unixTime) {
                unixTime = parseInt(unixTime) + parseInt(8) * 60 * 60;
                var time = new Date(unixTime * 1000);
                var ymdhis = "";
                ymdhis += time.getUTCFullYear() + "-";
                ymdhis += (((time.getUTCMonth()+1)<10)?("0"+(time.getUTCMonth()+1)):(time.getUTCMonth()+1)) + "-";
                ymdhis += (time.getUTCDate()<10)?"0"+time.getUTCDate():time.getUTCDate();
                ymdhis += " " + (time.getUTCHours()<10?"0"+time.getUTCHours():time.getUTCHours());
                ymdhis += ":" + (time.getUTCMinutes()<10?"0"+time.getUTCMinutes():time.getUTCMinutes());
                //ymdhis += ":" + (time.getUTCSeconds()<10?"0"+time.getUTCSeconds():time.getUTCSeconds());
                return ymdhis;
            }
        }
    });
})(jQuery);
$(window).bind("load", function () {

    // Remove splash screen after load
    $('.splash').css('display', 'none');

});

$(window).bind("resize click load", function () {

    // Add special class to minimalize page elements when screen is less than 768px
    setBodySmall();

    // Waint until metsiMenu, collapse and other effect finish and set wrapper height
    setTimeout(function () {
        fixWrapperHeight();
    }, 300);
});

function fixWrapperHeight() {

    // Get and set current height
    var navigationH = $(window).height();
    var navigationW = $(".sidebar-menu").width();
    var contentH = $(".content").height();
    var headerH = $("#header").height();
    if ($(this).width() < 769) {
        $("#wrapper").css("margin-left", "0px");
        $("#time1").html("<br/>&nbsp;");
        $("#time2").html("<br/>&nbsp;&nbsp;");
    } else {
        $("#wrapper").css("margin-left", navigationW + "px");
        $("#time1").html("");
        $("#time2").html("");
    }
    // Set new height when contnet height is less then navigation
    if (contentH < navigationH) {
        $("#wrapper").css("min-height", navigationH - 41 + 'px');
    }
    // Set new height when contnet height is less then navigation and navigation is less then window
    if (contentH < navigationH && navigationH < $(window).height()) {
        $("#wrapper").css("min-height", $(window).height() - 41 - headerH  + 'px');
    }

    // Set new height when contnet is higher then navigation but less then window
    if (contentH > navigationH && contentH < $(window).height()) {
        $("#wrapper").css("min-height", $(window).height() - 41 - headerH + 'px');
    }
    $(".sidebar-menu").css("min-height", $("#wrapper").height() + 45 + 'px');

}

function setBodySmall() {
    if ($(this).width() < 769) {
        $('body').addClass('page-small');
    } else {
        $('body').removeClass('page-small');
        $('body').removeClass('show-sidebar');
    }
}
//定义sparkLine类型图表
$(function(){
    Highcharts.SparkLine = function (a, b, c) {
        var hasRenderToArg = typeof a === 'string' || a.nodeName,
            options = arguments[hasRenderToArg ? 1 : 0],
            defaultOptions = {
                chart: {
                    renderTo: (options.chart && options.chart.renderTo) || this,
                    backgroundColor: null,
                    borderWidth: 0,
                    type: 'area',
                    margin: [0, 0, 0, 0],
                    width: 120,
                    height: 20,
                    style: {
                        overflow: 'visible'
                    },
                    skipClone: true
                },
                title: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
                xAxis: {
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: null
                    },
                    startOnTick: false,
                    endOnTick: false,
                    tickPositions: []
                },
                yAxis: {
                    endOnTick: false,
                    startOnTick: false,
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: null
                    },
                    tickPositions: [0]
                },
                legend: {
                    enabled: false
                },
                tooltip: {
                    backgroundColor: null,
                    borderWidth: 0,
                    shadow: false,
                    useHTML: true,
                    hideDelay: 0,
                    shared: true,
                    padding: 0,
                    positioner: function (w, h, point) {
                        return { x: point.plotX - w / 2, y: point.plotY - h };
                    }
                },
                plotOptions: {
                    series: {
                        animation: false,
                        lineWidth: 1,
                        shadow: false,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        marker: {
                            radius: 1,
                            states: {
                                hover: {
                                    radius: 2
                                }
                            }
                        },
                        fillOpacity: 0.25
                    },
                    column: {
                        negativeColor: '#910000',
                        borderColor: 'silver'
                    }
                }
            };

        options = Highcharts.merge(defaultOptions, options);

        return hasRenderToArg ?
            new Highcharts.Chart(a, options, c) :
            new Highcharts.Chart(options, b);
    };
});
//定义函数控制菜单栏打开收起
function toggleMenu(menuToggled) {
    var screenSizes = $.AdminLTE.options.screenSizes;
    if ($(window).width() > (screenSizes.sm - 1)) {
        if (menuToggled=='1') {
            $("body").addClass('sidebar-collapse').trigger('expanded.pushMenu');
        } else {
            $("body").trigger('expanded.pushMenu');
        }
    }
}