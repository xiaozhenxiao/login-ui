angular
    .module('pulse')
    .controller('sorttableCtl', sorttableCtl);
function sorttableCtl($scope, API, $location) {
    $scope.keySet=['a-----------a','b-----------b','c-----------c','d-----------d','e-----------e','f-----------f','g-----------g','h-----------h','I-----------i','J-----------j'];
    $scope.keySet2=['1-----------1','2-----------2','3-----------3','4-----------4','5-----------5','6-----------6','7-----------7','8-----------8','9-----------9','0-----------0'];
    $("#sortable,#sortable1").sortable({
            revert: true,
            scroll: false,
            helper: 'clone',
        connectWith: ".connectedSortable",
        stop : function(){
            var arr = $("#sortable").sortable('toArray');
            var arr1 = $("#sortable1").sortable('toArray');
        }
    }).disableSelection();

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