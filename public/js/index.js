  /*have the live connection between the client and the server via io method in javascript library*/
var socket=io()
socket.on('connect',()=>{
  console.log('Connected to server')

  socket.emit('createEmail',{
    to:"exemple2@exemple.com",
    text:'Hello'
  })
})

socket.on('disconnect',()=>{
  console.log('server is Disconnected')
})

socket.on('New email',(email)=>{
  console.log('New Email',email)
})
