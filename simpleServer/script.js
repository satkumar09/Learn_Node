const server = require('http')   //built in module

function engine(req,res){
  Response.writeHead(200, {'Content-Type':'text/plain'})
  Response.end('Hey there, from the server! :D')
}

server.createServer(engine).listen(3000)