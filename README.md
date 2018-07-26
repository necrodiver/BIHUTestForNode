## 转换成node版本的考勤管理系统

简介：使用node.js 建立的考勤统计转换的简易网站，前端使用了Semantic框架，后端使用基于node.js的Express

支持:

- 登录&注销
- 导入考勤Excel
- 转换Excel为必要格式
- 页面考勤展示 
- 个人中心（未完成）
- 个人中心 - 用户批量导入（未完成）
- 个人中心 - 个人信息修改（未完成）  
- 个人中心 - 用户信息修改（未完成）
- 个人中心 - 用户考勤审核（未完成）
- 个人中心 - 组管理（未完成）  

---

使用的组件:

- [body-parser 解析处理请求体 ](https://www.npmjs.com/package/body-parser)
- [config-lite 配置文件](https://www.npmjs.com/package/config-lite) 
- [crypto 加密解密组件](http://nodejs.cn/api/crypto.html)
- [ejs 模板引擎](https://www.npmjs.com/package/ejs)
- [express web后端nodejs框架](https://www.npmjs.com/package/express)  
- [marked](https://www.npmjs.com/package/marked)  暂未用到  
- [moment 日期时间操作插件](http://momentjs.cn/)
- [mongolass](https://www.npmjs.com/package/mongolass)  暂未用到
- [multer 用于上传接收操作](https://www.npmjs.com/package/multer)  
- node-gyp  
- objectid-to-timestamp   
- pinyin  用于汉字转拼音，暂未用到  
- [sequelize 用于CRUD操作MySql的组件](https://www.npmjs.com/package/sequelize)  
- [xlsx 解析操作xls或xlsx文件](https://www.npmjs.com/package/xlsx)  

---

文件夹:

.

+-- config 

|	+-- default.js ``配置文件  配置当前网站启动端口、配置session、配置mysql链接、配置aes加密规则，配置批量添加用户email内容`` 

+--  lib 

|	+-- linkmysql.js `链接mysql`  

+-- logs ``日志文件夹 `` 

| 	......

+-- middlewares 

|	+-- aeshelper.js ``AES加密解密自定义方法``

|	+-- checklogin.js ``检测登录状态``

|	+-- checkstr.js ``检测各种字符串规则：用户名、密码、月份``  

|	+-- heplers.js ``一些杂的帮助方法：深拷贝``

|	+-- init.js ``初始化需要执行的方法``  

|	+-- serializeattendance.js ``从Excel中获取考勤数据并转换的一系列操作  ``

|	+--userversion.js ``判断用户权限等级及用户登录状态  ``

+-- modelfilter 

|	+-- base_check.js ``验证打卡模型规范 `` 

|	+-- month_in_usermark.js ``验证用户打卡条件信息``  

|	+-- userfilter.js ``验证批量上传的用户姓名合集``  

+-- models 

|	+-- attendance.js  ``打卡备注表``  

|	+-- authority.js ``操作权限表``

|	+-- companygroup.js ``各个组表``  

|	+--  roles.js ``角色表``

|	+-- users.js ``用户表``  

+-- operate ``各种CRUD操作库``

|	......  

+-- public

|	+-- content  css

|	+-- img

|	+-- scripts 前端js  

|	+-- xls 存储上传的考勤Excel 

+-- routes 操作各种请求的入口路由的  

|	......

+-- views ejs视图  

|	......

+-- index.js 入口初始化配置  

+-- package-lock.json 

+-- package.json 

+-- README.md



