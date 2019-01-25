//express_demo.js 文件
/* eslint-disable */
var express = require('express');
var app = express();
const Mysql = require('mysql');
const bodyParser = require('body-parser')
var Cookies = require('cookies');


//对cookie进行相关设置
app.use(function (req,res,next) {
   req.cookies = new Cookies(req,res);
    //设置一个全局访问的页面,解析用户登录的cookie信息
    req.user={};
    if(req.cookies.get('user')){
        try{
            req.user=JSON.parse(req.cookies.get('userInfo'));
        }catch (e){}
    }
   next(); //不要忘记
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var db = Mysql.createPool({
   host: "127.0.0.1",
   user: "root",
   password: "12345678",
   database: "lichengjie",
   port: 3306,          // 端口号（默认都是3306）
   database: 'test', //数据库名称
   charset: 'UTF8_GENERAL_CI', //数据库编码
});

db.on('error', handleError);
function handleError (err) {
   if (err) {
    // 如果是连接断开，自动重新连接
   //  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
   //    Mysql.createPool({
   //       host: "127.0.0.1",
   //       user: "root",
   //       password: "12345678",
   //       database: "lichengjie",
   //       port: 3306,          // 端口号（默认都是3306）
   //       database: 'test', //数据库名称
   //       charset: 'UTF8_GENERAL_CI', //数据库编码
   //    });
   //  } else {
   //   console.error(err.stack || err);
   //  }
   }
  }

app.all('*', function (req, res, next) {
   res.header("Access-Control-Allow-Origin", 'http://localhost:3001');
   res.header("Access-Control-Allow-Credentials", true);
   res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");

   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By", ' 3.2.1')
   if (req.method == "OPTIONS") res.sendStatus(200)
   else next();
});





//  POST 请求
app.post('/login/login', function (req, res) {
    let user=req.body;
    let sqlStr=`select * from login where name=?`

    db.query(sqlStr,user.username,(err, data) => {
      var dataUser = JSON.parse(JSON.stringify(data))[0];
      if(dataUser===undefined){
         return res.json({code:'1',message:'登录人信息并不存在',data:false})
      }
      if(dataUser.password!==user.password){
         res.json({code:'1',message:'密码错误，请找管理员李成杰',data:false});
      }else{
         req.cookies.set('user',JSON.stringify({
            name:dataUser.name,
            password:dataUser.password
        }))
         // res.redirect('/layout');
         res.json({code:'0',message:'登录成功',data:true})
      }
  })
})

// 注册

app.post('/login/regist', function (req, res) {
   let user=req.body;
   let sqlStr=`select * from login where name=?`
   db.query(sqlStr,user.username,(err, data) => {
      var dataUser = JSON.parse(JSON.stringify(data))[0];
      if(dataUser==undefined){
         sqlStr=`INSERT INTO login (name,password) VALUES (?,?)`
         db.query(sqlStr,[user.username,user.password],(err, data) => {
            // var dataUser = JSON.parse(JSON.stringify(data));
            console.log(err)
            if(data){
               res.json({code:'0',message:'新增成功',data:true})
            }
        })
      }else{
         res.json({code:'1',message:'已有同名用户',data:false})
      }
   })
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