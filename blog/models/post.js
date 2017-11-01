// 加载数据库
let db = require("./db");

// 插入文章操作
exports.insert = (data, cb) => {
	let query = "insert into posts set ?";
	// 执行sql语句
	db.query(query, data, (err) => {
		if (err) {
			// 失败
			return cb(err);
		}
		// 成功
		cb(null);
	});
};


// 查询所有文章
exports.findAll = (cb) => {
	let query = "select * from posts";
	// 执行sql语句
	db.query(query, (err, rows) => {
		if (err) {
			// 查询失败
			return cb(err);
		}
		// 成功
		cb(null, rows);
	});
}


// 删除文章操作
exports.delete = (id, cb) => {
	let query = "delete from posts where id = ?";
	// 执行sql语句
	db.query(query, id, (err) => {
		if (err) {
			// 失败
			return cb(err);
		}
		// 成功
		cb(null);
	});
}











