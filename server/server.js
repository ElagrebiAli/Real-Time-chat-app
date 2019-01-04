require('./config/config')
/*built in module*/
const path=require('path')
const http=require('http')

/*install module*/
const express=require('express')
const socketIO=require('socket.io')
const _=require('lodash')

const {generateMessage}=require('./function/generateMessage')
const {generateLocation}=require('./function/generateLocation')
const {Users}=require('./function/users')
const publicPath=path.join(__dirname,'../public')
const port=process.env.PORT

var app=express()
var server =http.createServer(app)
/*pass the server that we want to use with our web sockets(integrate socket with our server) and have acess to javascript library*/
/*with io we can emitting or listening to events , to got communicate between the server
and the client  */
var io=socketIO(server)
var users=new Users()

app.use(express.static(publicPath))
/*using io.on() let's you register an event lessner */
io.on('connection',(socket)=>{
  console.log('New user connected')
  /*this socket argument we have access to over inside an index.html and chat.html*/
  socket.on('testExistName',(data)=>{
     let usersName=users.getRoomUserNameList(data.roomname)

     if(usersName.includes(data.username)){
          socket.emit('existName',{val:true})

     }else{
        socket.emit('existName',{val:false})
     }
  })
  socket.on('join',(queryString)=>{


   /* join a room */
   socket.join(queryString.roomname)
   users.removeUser(socket.id)
   users.addUser(socket.id,queryString.name,queryString.roomname)
   io.to(queryString.roomname).emit('updateUserList',users.getRoomUserNameList(queryString.roomname))
   /*broadcast the message for all the users in this room except the joined one*/
   socket.broadcast.to(queryString.roomname).emit('newMessage',generateMessage('Admin',`${queryString.name} Joined This${queryString.roomname}`))
  })



  socket.emit('newMessage',generateMessage('Admin','welcome to chat app'))
/*broadcast the message for all users expect the noined one*/
     /*socket.broadcast.emit('newMessage',generateMessage('Admin','new user joined'))*/

  socket.on('createMessage',(message,callback)=>{
    console.log('UserMessage',message)
    let user=users.getUserId(socket.id)
    /*broadcasting Events*/
    io.to(user.roomname).emit('newMessage',generateMessage(user.name,message.text))
    callback()
  })

  socket.on('sendLocation',(location,callback)=>{
    let user=users.getUserId(socket.id)
    io.to(user.roomname).emit('newLocation',generateLocation(user.name,location.latitude,location.longitude))
    callback()
  })

  socket.on('disconnect',()=>{
    var user=users.removeUser(socket.id)
    if(user){
      io.to(user.roomname).emit('updateUserList',users.getRoomUserNameList(user.roomname))
      io.to(user.roomname).emit('newMessage',generateMessage('Admin',`${user.name} left the chat room`))

    }
    console.log('User is disconnected')
  })
})




server.listen(port,()=>{
  console.log(`Server is up on ${port}`)
})
