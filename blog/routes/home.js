
let express = require("express");

let user = require("../models/user");

// 前台主路由
let home = express.Router();

// 子路由
home.get("/", (req, res) => {
	res.render("home/index", {});
});

// 显示文章页面
home.get("/article", (req, res) => {
	res.render("home/article", {});
});

// 显示注册页面
home.get("/register", (req, res) => {
	res.render("home/register", {});
})

// 显示登录页面
home.get("/login", (req, res) => {
	res.render("home/login", {});
})


// 执行注册
home.post("/register", (req, res) => {
	// 通过req.body来获取传过来的表单数据
	// console.log(req.body);
	// 调用模型，插入数据库
	user.insert(req.body, (err) => {
		if (!err) {
			// 数据库插入成功，响应json数据
			return res.json({
				code: 10000,
				msg: "注册成功"
			});
		}
		// 注册失败
		res.json({
			code: 10001,
			msg: "注册失败"
		})
	});
});


// 执行登录
home.post("/login", (req, res) => {
	// 执行登录操作
	user.auth(req.body.email, req.body.pass, (err, row) => {
		if (!err) {
			// 登录成功
			// 存一个session记录登录信息状态
			req.session.loginfo = row;
			return res.json({
				code: 10000,
				msg: "登录成功"
			});
		}
		// 登录失败
		res.json({
			code: 10001,
			msg: "登录失败"
		});
	});
})

module.exports = home;



