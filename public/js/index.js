  /*have the live connection between the client and the server via io method in javascript library*/
var socket=io()
socket.on('connect',()=>{
  console.log('Connected to server')

})

socket.on('disconnect',()=>{
  console.log('server is Disconnected')
})

socket.on('join',(email)=>{
  console.log('New Email',email)
})

socket.on('newJoined',(message)=>{
  console.log(message)
})
socket.on('newMessage',(message)=>{
  console.log(message)

})
