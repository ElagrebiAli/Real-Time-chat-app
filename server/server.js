require('./config/config')

/*built in module*/
const path=require('path')
const http=require('http')

/*install module*/
const express=require('express')
const socketIO=require('socket.io')

const publicPath=path.join(__dirname,'../public')
const port=process.env.PORT

var app=express()
var server =http.createServer(app)
/*pass the server that we want to use with our web sockets(integrate socket with our server) and have acess to javascript library*/
/*with io we can emitting or listening to events , to got communicate between the server
and the client  */
var io=socketIO(server)

app.use(express.static(publicPath))
/*using io.on() let's you register an event lessner */
io.on('connection',(socket)=>{
  /*this socket argument we have access to over inside an index.html*/
  console.log('New user connected')
  socket.on('disconnect',()=>{
    console.log('User is disconnected')
  })
  socket.emit('New email',{
    from:"exemple1@exemple.com",
    text:"hello",
    createdAt:123456
  })

  socket.on('createEmail',(createEmail)=>{
    console.log('CreateEmailFromUser',createEmail)
  })
})


server.listen(port,()=>{
  console.log(`Server is up on ${port}`)
})
