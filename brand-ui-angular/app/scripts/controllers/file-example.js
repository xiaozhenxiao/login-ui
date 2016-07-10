angular
    .module('pulse')
    .controller('fileExampleCtl', fileExampleCtl);
function fileExampleCtl($scope, API, fileReader) {
    $scope.getFile = function () {
        var image = $("#imgFile").val();
        var extStart=image.lastIndexOf(".");
        var ext=image.substring(extStart,image.length).toUpperCase();
        if(ext!=".BMP"&&ext!=".PNG"&&ext!=".GIF"&&ext!=".JPG"&&ext!=".JPEG") {
            alert("图片限于bmp,png,gif,jpeg,jpg格式");
            $("#imgFile").val("");
            return false;
        }
        try {
            fileReader.readAsDataUrl($scope.file, $scope)
                .then(function(result) {
                    $scope.imageSrc = result;
                });
        } catch (e) {
            console.log("no file read");
        }


    };
    $scope.reset = function() {
        $("#imgName").val("");
        $("#imgFile").val("");
        $("#image").attr("src", "");
    };
    $scope.upload = function() {
        if (!$("#imgName").val()) {
            alert("品牌id不能为空!");
            return;
        }
        if (!$("#imgFile").val()) {
            alert("请先选择图片!");
            return;
        }
        var form = $("#imgForm");
        form.attr("method", "POST");
        form.attr("action", API.uploadImgUrl);
        var options = {
            success:    showResponse,  // post-submit callback
            error:      showError

            // other available options:

            //target:     'body',   // target element(s) to be updated with server response
            //beforeSubmit:  showRequest,  // pre-submit callback
            //url:       url         // override for form's 'action' attribute
            //type:      type        // 'get' or 'post', override for form's 'method' attribute
            //dataType:  null        // 'xml', 'script', or 'json' (expected server response type)
            //clearForm: true        // clear all form fields after successful submit
            //resetForm: true        // reset the form after successful submit

            // $.ajax options can be used here too, for example:
            //timeout:   3000
        };
        form.ajaxSubmit(options);
    };
}
function showRequest() {

}
function showResponse(data) {
    alert("上传成功!");
}
function showError() {
    alert("upload error");
}