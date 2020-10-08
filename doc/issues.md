- [Vue warn]: Property or method "openActionSheet" is not defined on the instance but referenced during render. Make sure that this property is reactive, either in the data option, or for class-based components, by initializing the property.

```
openActionSheet 命名有冲突， 换个其他变量名解决。
```

- core-js

```
These dependencies were not found:

* core-js/modules/es.array-buffer.constructor in ./node_modules/@dcloudio/uni-h5/dist/index.umd.min.js
* core-js/modules/es.array-buffer.slice in ./node_modules/@dcloudio/uni-h5/dist/index.umd.min.js
* core-js/modules/es.array.concat in ./node_modules/@dcloudio/uni-h5/dist/index.umd.min.js
// ...

// core-js/library/fn/object/assign in ./node_modules/babel-runtime/core-js/object/assign.js

// 重装core-js@3.6.5后恢复正常 (和element-ui有冲突)
```

- vscode vue 格式化问题, 安装以下插件， 相关配置参考`.vscode`

```
1)ESlint
2)vetur
3)Prettier - Code formatter
4)Manta’s Stylus Supremacy
```

- chunk-vendors.js:49854 GET http://localhost/sockjs-node/info?t=1602146951108 net::ERR_CONNECTION_REFUSED

```
https://www.cnblogs.com/sichaoyun/p/10178080.html
```