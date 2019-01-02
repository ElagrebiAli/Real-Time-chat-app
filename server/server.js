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

  socket.emit('join',{
    from:"Admin",
    text:"hello in chatApp",
    joinAt:new Date().getTime()
  })
/*broadcast the message for all users expect the noined one*/
  socket.broadcast.emit('newJoined',{
    from:'Admin',
    text:'New user joined',
    joinedAt:new Date().getTime()
  })

  socket.on('createMessage',(message)=>{
    console.log('UserMessage',message)
    /*broadcasting Events*/
    io.emit('newMessage',{
      from:message.from,
      text:message.text
    })
  })
})


server.listen(port,()=>{
  console.log(`Server is up on ${port}`)
})
