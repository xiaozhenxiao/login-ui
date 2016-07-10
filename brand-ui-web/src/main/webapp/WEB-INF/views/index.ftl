<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="pragma" content="no-cache" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>登录</title>
    <link rel="stylesheet" type="text/css" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="assets/css/first-layout.css">
  </head>
  <body class="body-bg-full v2">
    <div class="container page-container">
      <div class="page-content">
        <div class="v2">
          <div class="logo"><img src="assets/images/logo/logo.png" alt="" width="100"></div>
          <form method="post" action="/brand/login" class="form-horizontal">
          <#if ref??><input type="hidden" name="ref" value="${ref}"></#if>
            <div class="form-group">
              <div class="col-xs-12">
                <input type="text" placeholder="用户名" name="username" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <div class="col-xs-12">
                <input type="password" placeholder="密码" name="password" class="form-control">
              </div>
            </div>
            <div class="form-group">
              <div class="col-xs-12">
                <div class="checkbox-inline checkbox-custom pull-left">
                  <input id="remember" type="checkbox" name="remember" value="true">
                  <label for="remember" class="">记住登录</label>
                </div>
                <div class="pull-right"><a href="#" class="inline-block form-control-static">忘记密码</a></div>
              </div>
            </div>
            <button type="submit" class="btn-lg btn btn-primary btn-rounded btn-block">登录</button>
          </form>
        </div>
      </div>
    </div>
  </body>
</html>