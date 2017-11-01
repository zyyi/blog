
let express = require("express");

// 加载post模块
let post = require("../models/post");

// 加载user模块
let user = require("../models/user");

// 后台主路由
let admin = express.Router();

// 显示后台首页面
admin.get("/", (req, res) => {
	res.render("admin/index", {});
})

// 显示添加播客页面
admin.get("/add", (req, res) => {
	res.render("admin/add", {});
})

// 显示个人中心页面 (并显示数据)
admin.get("/settings", (req, res) => {
	// 通过session获取该登录用户的id
	let uid = req.session.loginfo.id;
	// 执行，查询用户个人资料
	user.find(uid, (err, rows) => {
		if (!err) {
			// rows是一个数组，个人资料在rows[0]（第一项）中
			res.render("admin/settings", {user: rows[0]})
		}
	});
})

// 显示文章列表页面  (并显示数据)
admin.get("/list", (req, res) => {
	post.findAll((err, rows) => {
		if (err) {
			// 查询失败
			return res.send("查询数据库失败！");
		}
		// 查询成功
		res.render("admin/list", {lists: rows});
	})
})



// 退出登录
admin.get("/logout", (req, res) => {
	// 清空登录信息
	req.session.loginfo = null;
	// 跳转到登录页面
	res.redirect("/login");
})


// 添加文章
admin.post("/add", (req, res) => {
	// console.log(req.body);
	// 当前添加文章的作者就是登录用户，
	// 通过session中存储的用户信息可以读取到作者的id
	// 然后将id记录到播客文章中
	req.body.uid = req.session.loginfo.id;
	post.insert(req.body, (err) => {
		if (!err) {
			// 添加成功
			return res.json({
				code: 10000,
				msg: "添加成功！"
			});
		}
		// 添加失败
		res.json({
			code: 10001,
			msg: "添加失败！"
		})
	})
})


// 删除文章
admin.get("/delete", (req, res) => {
	// 根据文章id进行删除, req.query 可以接收get请求携带的参数
	post.delete(req.query.id, (err) => {
		if (!err) {
			// 删除成功
			return res.json({
				code: 10000,
				msg: "删除成功！"
			});
		}
		// 删除失败
		res.json({
			code: 10001,
			msg: "删除失败！"
		});
	})
})


// 个人中心->修改个人资料
admin.post("/update", (req, res) => {
	console.log(req.body);
	// 获取当前登录用户的id值
	let uid = req.session.loginfo.id;
	// 执行更新操作 (根据用户的id值)
	user.update(uid, req.body, (err) => {
		if (!err) {
			// 更新成功
			return res.json({
				code: 10000,
				msg: "更新成功！"
			});
		}
		// 更新失败
		res.json({
			code: 10001,
			msg: "更新失败！"
		});
	});
})

module.exports = admin;
