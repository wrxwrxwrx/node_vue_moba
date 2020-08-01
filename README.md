# Nodejs + Vue.js
> 项目笔记

## 一、项目初始化

1. 在github中新建一个项目，gitignore选择node，readme也可选
2. 从github下载该空项目
3. 新建api接口项目的文件夹，为：
*  server：api接口项目

## 二、 创建项目和安装必要的库

### （一） 用户端vue项目（web）处理
1. 创建项目
> vue create web
* 配置选择：default

### （二） 后台端vue项目（admin）处理
1. 创建项目
> vue create admin
* 配置选择：default
2. 安装element-ui插件
> cd admin  
> vue add element
* 配置选择：Fully import
3. 安装router插件 
> vue add router
* 配置选择：Use history mode for router? --> no
4. 安装axios插件 
> npm i axios
5. 后台vue项目
> npm run serve

### （三） 服务器express项目（server）处理
1. 进入server文件夹
2. 初始化项目
> npm init -y
3. 在项目的根目录中新建 index.js 作为服务端的入口文件
4. 在 package.json 中的"scripts"中加入
> "scripts": {  
    "serve":"nodemon index.js",  
    "test": "echo \"Error: no test specified\" && exit 1"  
  }
5. 安装nodemon(若已安装则不需要了)
> npm i -g nodemon
6. 安装常用模块
> npm i express@next mongoose cors
7. 启动服务端项目
> npm run serve

## 三、 新增分类和分类列表请求

### （一）初始界面
1. 新建 admin -> src -> views -> Main.js 用于存放整体布局
2. 在 router -> index.js 中引用 Main.js
3. 删除 App.vue 中不必要的代码

### （二）新增分类
* admin
1. 在 Main.js 中设置路由（router，index=“地址”）
2. 新建 admin -> src -> views -> CategoryEdit.vue 绘制创建（编辑）分类界面
3. 在 router -> index.js 中引用 CategoryEdit.js
4. 新建 admin -> src -> http.js 用于接口请求
5. 在 main.js 中引用http

* server
1. 在 server -> index.js 中：
> （1）引用 express  
> （2）定义一个 app 为 express 的实例  
> （3）.listen() 启动

2. 写分类相关的路由
> （1）新建 server -> routes -> admin -> index.js 用来表示后端路由  
> （2）编辑 routes -> admin -> index.js 文件,写后端的分类路由接口  
> （3）在 server -> index.js 中引用 routes/admin  
> （4）新建 server -> plugins -> db.js 用来表示数据库  
> （5）编辑 server -> plugins -> db.js 文件,应用mongoose  
> （6）在 server -> index.js 中引用 plugins/db，用于数据库链接  
> （7）新建 server -> models -> Category.js 用来表示分类数据库模型  
> （8）编辑 server -> models -> Category.js 文件,建数据库中的分类的表  
> （9）在 routes -> admin -> index.js 文件中引用 server -> models -> Category.js，并写创建数据逻辑  
> （10）在 server -> index.js 中，利用中间件引用express.json() 使json数据可用，并引用cors跨域模块

* admin
1. 发起添加分类的路由请求
2. 去后台界面测试添加分类的功能

### （三）实现分类列表页面
* admin
1. 新建 admin -> src -> views -> CategoryList.vue 绘制分类列表界面
2. 在路由中引用

* server
1. 在 server -> routes -> admin -> index.js 中请求分类列表的接口

* admin
1. 发起获取分类列表的请求
