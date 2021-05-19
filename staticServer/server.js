var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]
if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}
var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method
/******** 从这里开始看，上面不要看 ************/
console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)
if(path === "/sign_in" && method === "POST"){
  const userArray = JSON.parse(fs.readFileSync("./db/users.json"))
  const array = []
  request.on(
    'data',
    (chunk)=>{array.push(chunk)}
  )
  request.on(
    'end',
    ()=>{
      let string = Buffer.concat(array).toString()
      user = JSON.parse(string)
      
      let obj = userArray.find((obj)=>user.name===obj.name && user.password === obj.password)
      if(obj===undefined){
        response.setHeader('Content-Type', 'text/json; charset=utf-8')
        response.statusCode = 400
        response.end(`{ "not match": 4001}`)
      }else{
        response.statusCode = 200
        response.setHeader('Set-Cookie', `user_id=${user.id};HttpOnly`)
        response.end()
      }
      fs.writeFileSync('./db/users.json', JSON.stringify(userArray))
    }
  )
}else if(path === "/home.html"){
  
  if(request.headers["cookie"] === "logined=1"){
    const homeHtml = fs.readFileSync("./public/home.html").toString()
    string = homeHtml.replace('{{loginStatus}}', 'Already logged in')
    response.write(string)
  }else{
    const homeHtml = fs.readFileSync("./public/home.html").toString()
    string = homeHtml.replace('{{loginStatus}}', 'Welcome')
    response.write(string)
  }



}else 
if(path === "/register" && method === "POST"){
  response.setHeader('Content-Type', 'text/html;charset=utf-8')
  const userArray = JSON.parse(fs.readFileSync("./db/users.json"))
  const array = []
  request.on(
    'data',
    (chunk)=>{array.push(chunk)}
  )
  request.on(
    'end',
    ()=>{
      let string = Buffer.concat(array).toString()
      user = JSON.parse(string)
      console.log(user.name)
      console.log(user.password)
      response.end("Well Done");

      let lastUser = userArray[userArray.length - 1]
      const newUser = {

        id: lastUser ? lastUser.id + 1 : 1,
        name: user.name,
        password: user.password
      }
      userArray.push(newUser)
      fs.writeFileSync('./db/users.json', JSON.stringify(userArray))
    }
  )
}
else{
  response.statusCode = 200
  // 默认首页

  const filePath = path === '/' ? '/index.html' : path
  const index = filePath.lastIndexOf('.')
  // suffix 是后缀
  const suffix = filePath.substring(index)
  const fileTypes = {
    '.html':'text/html',
    '.css':'text/css',
    '.js':'text/javascript',
    '.png':'image/png',
    '.jpg':'image/jpeg'
  }
  response.setHeader('Content-Type', 
    `${fileTypes[suffix] || 'text/html'};charset=utf-8`)

  let content 
  try{
    content = fs.readFileSync(`./public${filePath}`)
  }catch(error){
    content = '文件不存在'
    response.statusCode = 404
  }
  response.write(content)
  response.end()
}

/******** 代码结束，下面不要看 ************/
})
server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
