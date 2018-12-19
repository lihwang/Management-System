//express_demo.js 文件
var express = require('express');
var app = express();
const Mysql=require('mysql');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

var db = Mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "12345678",
    database: "lichengjie",
    port: 3306,          // 端口号（默认都是3306）
    database: 'test', //数据库名称
    charset: 'UTF8_GENERAL_CI' //数据库编码
});

app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", 'http://localhost:3001');
   res.header("Access-Control-Allow-Credentials", true);
   res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");

   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1')
   if(req.method=="OPTIONS") res.sendStatus(200)
   else  next();
});



// app.get('/', function (req, res) {
//     console.log("主页 GET 请求");
//     res.send('Hello GET');
//  })
  
  
 //  POST 请求
 app.post('/login/login', function (req, res) {
    console.log(req.body)
   //  console.log(req)
   //  let sqlStr=`select * from login where name=?`
   //  db.query()
   // res.
 })


  
//  //  /del_user 页面响应
//  app.get('/del_user', function (req, res) {
//     console.log("/del_user 响应 DELETE 请求");
//     res.send('删除页面');
//  })
  
//  //  /list_user 页面 GET 请求
//  app.get('/list_user', function (req, res) {
//     console.log("/list_user GET 请求");
//     res.send('用户列表页面');
//  })
  
//  // 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
//  app.get('/ab*cd', function(req, res) {   
//     console.log("/ab*cd GET 请求");
//     res.send('正则匹配');
//  })

var server = app.listen(3002, function () {
  var host = server.address().address
  var port = server.address().port
 console.log("应用实例，访问地址为 http://%s:%s", host, port)
})