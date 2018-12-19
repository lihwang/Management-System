const Express=require('express');
const Mysql=require('mysql');


var db = Mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "12345678",
    database: "lichengjie",
    port: 3306,          // 端口号（默认都是3306）
    database: 'test', //数据库名称
    charset: 'UTF8_GENERAL_CI' //数据库编码
});


// var insertSQL = 'insert into t_user(name) values("conan"),("fens.me")';
// var selectSQL = 'select * from t_user limit 10';
// var deleteSQL = 'delete from t_user';
// var updateSQL = 'update t_user set name="conan update"  where name="conan"';

////查
db.query(`SELECT * FROM user`, (err, data) => {
    var SearchData = JSON.parse(JSON.stringify(data));
    console.log(SearchData)
    if (err)
        console.log(err);
})

// //增
// db.query(`INSERT INTO user (id, name,age) VALUES ('2','测试',11)`, (err, data) => {
//     var SearchData = JSON.parse(JSON.stringify(data));
//     if (err)
//         console.log(err);
// })

//改
// db.query(`update user set name=?,age=?  where id = ?`,['测试123',10,1], (err, data) => {
//     var SearchData = JSON.parse(JSON.stringify(data));
//     console.log(SearchData)
//     if (err)
//         console.log(err);
// })

//删
// db.query(`DELETE FROM user where id=2`, (err, data) => {
//     var SearchData = JSON.parse(JSON.stringify(data));
//     console.log(SearchData)
//     if (err)
//         console.log(err);
// })