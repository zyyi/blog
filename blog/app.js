let express = require("express");

// 加载解析post方式传过来的数据的模块
let bodyParser = require("body-parser");

// 加载session模块
let session = require("express-session");

let app = express();

app.listen(3000);

app.set("views", "./views");

app.set("view engine", "xtpl");

app.use(express.static("./public"));

// 使用中间件来解析post方式请求的数据
app.use(bodyParser.urlencoded({extended: false}));


// 处理session的中间件，当使用了session中间件后，
// 就在req上添加了一个session属性，通过这个属性
// 可以实现设置和读取session目的
app.use(session({
	secret: "ssss",
	resave: false,
	saveUninitialized: false
	// cookie: {secure: true} // 如果设置该项，则必须是https协议访问
}))

// 在node.js中，默认情况下session是放到内存当中的，
// 所以当服务器重启后，session也会消失
app.use("/admin", (req, res, next) => {
	// 如果没有检测到登录装态就跳转到登录页
	if (!req.session.loginfo && req.url != "/login") {
		// http 要求请求头设置前不允许有响应主体
		return res.redirect("/login");
	}
	next();
})

app.use("/login", (req, res, next) => {
	// 当已经登录过了，在进登录页面会自动进入后台页面
	if (req.session.loginfo) {
		// http 要求请求头设置前不允许有响应主体
		return res.redirect("/admin");
	}
	next();
})


// 可以通过路由来区分前台网站和后台网站
// 但是前后台网站又可以分成若干子路由
// 如何将主路由和若干子路由联系起来？

// 使用express.Router() 来创建主路由
// 主路由可以认为是一个中间件
// 主路由下再创建子路由

let admin = require("./routes/admin");

let home = require("./routes/home");

app.use("/admin", admin);

app.use("/", home);




