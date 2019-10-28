## 关于本页面

本页面，是介绍关于本网站相关的内容，包括：

* 网站架构
  *  `前端`
  *  `后端`
  *  `部署`
* 各个页面功能及涉及技术
* 网站未来设想

## 网站架构

网站起源于自己之前的一个想法——独立完成一个项目的整个过程，包括设计、前端、后端、部署、上线。

### 前端

1.前端核心[Vue2.0](https://cn.vuejs.org/)全家桶(vue-cli+vue+vue-router+vuex+axios+es6+less+[element-ui](https://element.eleme.cn/#/zh-CN/))。另外项目还用到[vue-clipboard2](https://www.npmjs.com/package/vue-clipboard2)用作首页中微信、qq的快速复制，[better-scroll](http://ustbhuangyi.github.io/better-scroll/doc/api.html)用作收藏页面的定位滚动，[lodash](https://www.lodashjs.com/)用作快速便捷的处理数据。

2.vue-cli搭建项目前端基本框架；

3.项目通过配置rem单位来支持响应，根字体大小限制在30px到36px间，不至于过大或过小影响页面整体UI效果；

4.项目字体图标库使用的是[阿里巴巴矢量图标库](https://www.iconfont.cn)，可以按自己需求添加需要的图标；

5.项目主体内容部分采用vue-router二级路由配置实现跳转，以保持网站主框UI的一致性，路由组件通过require.ensure方式按需引入，通过keep-alive缓存页面数据，防止切换频繁而产生的额外数据请求；

6.项目通过vuex配合localStorage来控制操作权限，1级权限可以对经历、收藏页面数据进行增删改查，而2级权限只能查。原权限是通过前置登录页获取，根据规定网站不能使用前置登录页，故调整登录页为角色切换页，网站默认2级权限进入，在收藏页筛选输入框中'pnfeather'可跳转到权限切换页(防止个人资料数据被改乱了，1级权限不对外开放)。

7.项目通过[cross-env](https://www.npmjs.com/package/cross-env)来控制项目开发、线上打包控制。

8.项目统一化配置axios默认配置文件，通过process.env切换不同环境接口请求的基本路径，通过axios请求拦截功能队列化接口请求，并移除队列中通请求，防止短时间内多次请求同接口。配置文件默认输出一个install对象，在项目入口文件通过Vue.use挂载到Vue的原型链上，这样在项目其他位置可以方便使用。

9.项目使用es6 Promise及es7 async/await来控制控制数据的异步；使用es6函数语法防止this指向变动；首页使用es6 class创建公共方法达成首页打字输出效果。

### 后端

1.后端核心[node](http://nodejs.cn/)、[express](http://www.expressjs.com.cn/)、[express-generator](http://www.expressjs.com.cn/starter/generator.html)、[mongodb](https://docs.mongodb.com/)
。

2.express-generator搭建项目后端基本框架；

3.对mongodb的增、删、改、查、分页等常用数据处理方法进行统一封装；

4.引入[crypto](https://developer.mozilla.org/zh-CN/docs/Web/API/Crypto)对部分数据进行加密；

5.引入[express-session](http://www.expressjs.com.cn/en/resources/middleware/session.html)来处理缓存session，以此来保持用户角色的状态维持；

6.引入[supervisor](https://www.jianshu.com/p/39b476e808d8)来实现项目自动重启，类热启动。

### 部署

1.项目部署在云服务器上；

2.前端使用[nginx](https://www.runoob.com/w3cnote/nginx-setup-intro.html)部署，并调整对应防火墙；

3.后端通过全局引入[forever](https://www.npmjs.com/package/forever)来启动node服务，并调整对应防火墙；

4.mongodb配置文件的写入，本地下载[Robo 3T](https://www.cnblogs.com/tugenhua0707/p/9250673.html)可视化控制mongodb数据；

5.域名的申请与映射。

## 页面功能及涉及技术

 * [首页](#/home)——简要信息介绍，电磁干扰字体、多元素旋转等css动画，e6类方法封装打字渲染，联系方式点击复制通过vue-clipboard2插件实现，鼠标移入微信联系方式自动弹出‘微信二维码’。

 * [经历](#/experience)——工作时间线，副标题可以点击下载word版本简历，时间线由近及远默认值展开最近的时间线，点击时间右侧下拉线可以切换展开与隐藏，1级权限可以对时间线进行增、删、改。

 * [收藏](#/collect)——平时用到的一些有用的线上工具，或者读到的一些觉得有意义的技术文章链接，右侧可以进行筛选、定位；点开下拉可以查看详情，1级权限可以对收藏进行增、删、改。

 * [关于](#/about)——当前页面，对网站的一些介绍，引入html-loader、markdown-loader解析md文件，通过[mavon-editor](https://www.npmjs.com/package/mavon-editor)插件读取md渲染。



## 网站未来设想

1.内容方面，根据笔者自身经历以及网路足印，实时动态更新。

2.部署方面，包括使用`docker实现项目镜像化管理`，使用`jenkins实现项目的一键部署`。
