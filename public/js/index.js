  /*have the live connection between the client and the server via io method in javascript library*/
var socket=io()
socket.on('connect',()=>{
  console.log('Connected to server')

})

socket.on('disconnect',()=>{
  console.log('server is Disconnected')
})

socket.on('newMessage',(message)=>{
  console.log(message)
  var li=jQuery('<li></li>')
  li.text(`${message.from}:${message.text}`)
  jQuery('#messages').append(li)

})

jQuery('#message-form').on('submit',(event)=>{
  event.preventDefault()
  socket.emit('createMessage',{
    from:'User',
    text:jQuery('[name=message]').val()
  })
})
