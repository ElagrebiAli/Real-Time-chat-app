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

socket.on('newLocation',(location)=>{
  console.log(location)
  var li=jQuery('<li></li>'),
      a=jQuery('<a target="_blank">My Location</a>')

  li.text(`${location.from}:`)
  a.attr('href',location.url)
  li.append(a)
  jQuery('#messages').append(li)
})

/*attached the event with jquery*/
jQuery('#message-form').on('submit',(event)=>{
  /*prevent the default behavior of the form*/
  var inputMessage=jQuery('[name=message]')
  event.preventDefault()
  socket.emit('createMessage',{
    from:'User',
    text:inputMessage.val()
  },()=>{
    inputMessage.val('')
  })

})

var locationSend=jQuery('#send-location')

locationSend.on('click',function(){

  if(!navigator.geolocation) {
    return alert('Geolocation API not supported in your browser')
  }
  locationSend.attr('disabled','disabled')
  locationSend.text('Send Location ...')
  navigator.geolocation.getCurrentPosition(function(position){
   /*this function(position) will work when the geolocation fetch the location*/
    socket.emit('sendLocation',{
      from:'User',
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    },()=>{
      locationSend.removeAttr('disabled')
      locationSend.text('Send Location')
    })


  },function(){
    locationSend.removeAttr('disabled')
    locationSend.text('Send Location')
    alert('Unable to fetch location')
  })
})
