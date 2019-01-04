require('./config/config')
/*built in module*/
const path=require('path')
const http=require('http')

/*install module*/
const express=require('express')
const socketIO=require('socket.io')

const {generateMessage}=require('./messageFunction/generateMessage')
const {generateLocation}=require('./messageFunction/generateLocation')
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
  socket.on('join',(queryString)=>{
console.log(queryString)

  })
  socket.emit('newMessage',generateMessage('Admin','welcome to chat app'))
/*broadcast the message for all users expect the noined one*/
  socket.broadcast.emit('newMessage',generateMessage('Admin','New user add'))

  socket.on('createMessage',(message,callback)=>{
    console.log('UserMessage',message)
    /*broadcasting Events*/
    io.emit('newMessage',generateMessage(message.from,message.text))
    callback()
  })

  socket.on('sendLocation',(location,callback)=>{
    io.emit('newLocation',generateLocation(location.from,location.latitude,location.longitude))
    callback()
  })
})




server.listen(port,()=>{
  console.log(`Server is up on ${port}`)
})
