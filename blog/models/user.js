let db = require("./db");

// 插入用户数据
exports.insert = function (data, cb) {
	// 插入语句
	let query = "insert into users set ?";
	// 对密码进行加密
	data.pass = db.md5(data.pass);
	// 执行sql语句
	db.query(query, data, (err) => {
		// 有错误
		if (err) {
			return cb(err);
		}
		// 没有错误
		cb(null);
	});
};



// 查询用户进行登录
exports.auth = function (email, password, cb) {
	let query = "select * from users where email = ?";
	// 执行查询操作
	db.query(query, email, (err, rows) => {
		if (err) {
			return cb(err);
		}
		// 登录成功
		if (rows[0].pass == db.md5(password)) {
			return cb(null, rows[0]);
		}
		// 登录失败提示信息
		cb({msg: "用户名或密码错误！"});
	})
}



// 查询个人资料
exports.find = (id, cb) => {
	let query = "select * from users where id = ?";
	// 执行sql语句
	db.query(query, id, (err, rows) => {
		if (err) {
			// 查询失败
			return cb(err);
		}
		// 查询成功
		cb(null, rows);
	})
}


// 修改个人资料
exports.update = (id, data, cb) => {
	let query = "update users set ? where id = ?";
	// 执行sql语句
	db.query(query, [data, id], (err) => {
		if (err) {
			// 修改失败
			return cb(err);
		}
		// 修改失败
		cb(null);
	});
}


