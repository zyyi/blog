
let express = require("express");

// 后台主路由
let admin = express.Router();

// 子路由
admin.get("/a", (req, res) => {
	res.send("后台的a");
})

module.exports = admin;