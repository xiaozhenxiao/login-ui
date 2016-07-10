# brand-ui

## 编译

    mvn clean package -DskipTests=true

编译操作会耗时比较长, 因为会将`platform-ui`项目的安装环境都会安装, 如果存在只是执行`grunt build`, 最终的产物会放到`webapps`中

## 更新 subtree

    git subtree pull -P brand-ui-angular git@git.hanyun.com:platform/platform-ui.git master
    git push

## 提交 subtree

    git commit brand-ui-angular/xxxx -m "modify subtree xxxx"
    git push
    git subtree push -P brand-ui-angular git@git.hanyun.com:platform/platform-ui.git master
