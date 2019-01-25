#一般前端的热更新应用  WEB服务
Node.js 提供了 http 模块，http 模块主要用于搭建 HTTP 服务端和客户端，使用 HTTP 服务器或客户端功能必须调用 http 模块


Express 简介
Express 是一个简洁而灵活的 node.js Web应用框架, 提供了一系列强大特性帮助你创建各种 Web 应用，和丰富的 HTTP 工具。
使用 Express 可以快速地搭建一个完整功能的网站。

Express 框架核心特性：
可以设置中间件来响应 HTTP 请求。
定义了路由表用于执行不同的 HTTP 请求动作。
可以通过向模板传递参数来动态渲染 HTML 页面。




Request 对象 - request 对象表示 HTTP 请求，包含了请求查询字符串，参数，内容，HTTP 头部等属性。常见属性有：

req.app：当callback为外部文件时，用req.app访问express的实例
req.baseUrl：获取路由当前安装的URL路径
req.body / req.cookies：获得「请求主体」/ Cookies
req.fresh / req.stale：判断请求是否还「新鲜」
req.hostname / req.ip：获取主机名和IP地址
req.originalUrl：获取原始请求URL
req.params：获取路由的parameters
req.path：获取请求路径
req.protocol：获取协议类型
req.query：获取URL的查询参数串
req.route：获取当前匹配的路由
req.subdomains：获取子域名
req.accepts()：检查可接受的请求的文档类型
req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages：返回指定字符集的第一个可接受字符编码
req.get()：获取指定的HTTP请求头
req.is()：判断请求头Content-Type的MIME类型


Response 对象 - response 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据。常见属性有：

res.app：同req.app一样
res.append()：追加指定HTTP头
res.set()在res.append()后将重置之前设置的头
res.cookie(name，value [，option])：设置Cookie
opition: domain / expires / httpOnly / maxAge / path / secure / signed
res.clearCookie()：清除Cookie
res.download()：传送指定路径的文件
res.get()：返回指定的HTTP头
res.json()：传送JSON响应
res.jsonp()：传送JSONP响应
res.location()：只设置响应的Location HTTP头，不设置状态码或者close response
res.redirect()：设置响应的Location HTTP头，并且设置状态码302
res.render(view,[locals],callback)：渲染一个view，同时向callback传递渲染后的字符串，如果在渲染过程中有错误发生next(err)将会被自动调用。callback将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出了。
res.send()：传送HTTP响应
res.sendFile(path [，options] [，fn])：传送指定路径的文件 -会自动根据文件extension设定Content-Type
res.set()：设置HTTP头，传入object可以一次设置多个头
res.status()：设置HTTP状态码
res.type()：设置Content-Type的MIME类型



请求问题：
    1.利用body-parser解析请求主题中的数据
    const bodyParser = require('body-parser')
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())

    2.req.params,req.query,req.body对于才入门的同学来说经常会弄混

    req.params所对应的url长这个样子 http://localhost:3000/10
    app.get("/:id",function (req,res) {
        res.send(req.params["id"]);
    });

    所对应的url长这个样子http://localhost:3000/?id=10
    app.get("/",function (req,res) {
        res.send(req.query["id"]);
    });

    req.body是用在post请求当中
    从其中不难看出get请求和post请求的区别，get接受参数使用req.query,而post接受参数使用req.body