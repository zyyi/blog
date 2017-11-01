let mysql = require("mysql");

// 加载数据加密模块
let md5 = require("md5");

let db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "123456",
	database: "blog"
});

db.md5 = md5;

module.exports = db;