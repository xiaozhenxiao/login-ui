# Start Devlopment

## 安装 nodejs

[http://nodejs.org/dist/](http://nodejs.org/dist/)

## 配置 npm

配置 `$HOME/.npmrc` 文件

    registry=http://artifactory.hanyun.com/node

或者执行命令

    npm config set registry http://artifactory.hanyun.com/api/npm/node

## 配置 bower

安装 `bower-art-resolver` 主要支持从 artifactory 上抓取

    npm install -g bower-art-resolver

配置 `$HOME/.bowerrc` 文件

    {
        "registry" : "http://artifactory.hanyun.com/api/bower/bower",
        "resolvers" : [
            "bower-art-resolver"
        ]
    }

## 安装 grunt bower

    npm -g install grunt-cli
    npm -g install bower

## 运行

执行 npm 下载包

    npm install

安装 bower 依赖包

    bower install

运行

    grunt live

## about the UI 

* https://almsaeedstudio.com/preview
* angularjs
* bootstrap
