
## 项目启动步骤

-   Step one: 克隆项目到本地(clone project to local env)

    git clone ssh://git@139.198.19.29:10000/guohao/elecsafe_web_pc.git

-   Step two: 进入项目目录(switch to the project catalogue)

    cd elecsafe_web_pc

-   Step three: 切换到项目开发分支(checkout the branch to dev)

    git checkout dev

-   Step four: 安装项目依赖(install project dependences)

    yarn install

-   Step five: 启动项目(start the project)

    yarn dev

## 项目目录结构

```
|- less/scss: 样式目录

    |- components: 组件样式

    |- page-factory: 工厂版page style

    |- page-factory-all: 渠道版page style

|- src: 页面相关目录

    |- api: 服务api接口管理目录

    |- components: 公共组件目录

    |- consts: 常量目录

    |- pages: 页面管理目录

    |- router: 路由目录

    |- utils: 公共函数方法目录

|- statics: 静态资源目录

    |- imgs：静态图片

    |- icons：存放iconfont

|- vuex/Redux 状态管路目录： store

|- build： webpack 构建目录


```

## 采用的插件有

-   mockjs
-   moment => 日期处理类库，中文文档 http://momentjs.cn/

