#安装sql8.0
安装涉及密码选第二个


#学习网址  http://www.runoob.com/nodejs/nodejs-mysql.html

var mysql= require('mysql');

mysql的几种链接方式：？
建议使用createPool，断开后会自动链接


 
var connection = mysql.createPool({     
  host     : 'localhost',       
  user     : 'root',              
  password : '123456',       
  port: '3306',                   
  database: 'test' 
}); 

#-----都是通过sql语句去操作-----
##查
var  sql = `SELECT * FROM websites`; //sql查询语句
connection.query(sql,(err, result)=>{  }）

##增
var  addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
var  addSqlParams = ['菜鸟工具', 'https://c.runoob.com','23453', 'CN'];
connection.query(addSql,addSqlParams,(err, result)=>{ }）

##改
var modSql = 'UPDATE websites SET name = ?,url = ? WHERE Id = ?';
var modSqlParams = ['菜鸟移动站', 'https://m.runoob.com',6];