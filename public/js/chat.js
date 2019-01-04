  /*have the live connection between the client and the server via io method in javascript library*/

var socket=io()
/*convert queryString to object using RegExp*/
function deparam(queryString){
  var object={}
  queryString.replace(
    new RegExp(
       "([^?=&]+)(=([^&#]*))?", "g"),
       function($0, $1, $2, $3) {
         object[$1] = decodeURIComponent($3.replace(/\+/g, '%20'));
       })
  return object
}


/*autoscrolling functio*/
function autoScrolling(){
  //select DOM
  var messages=jQuery('#messages')
  var message=jQuery('#messages li:last-child')

  //get Height of the selector
  var scrollHeight=messages.prop('scrollHeight'),
      scrollTop=messages.prop('scrollTop'),
      clientHeight=messages.prop('clientHeight'),
      /*This method returns the height of the element, including top and bottom padding*/
      newMessage=message.innerHeight(),
      /*To select the element that comes immediately before the newMessage*/
      lastMessage=message.prev().innerHeight()
      console.log(`scrollHeight:${scrollHeight},scrollTop:${scrollTop},clientHeight:${clientHeight},newMessage:${newMessage}`)
if(clientHeight+scrollTop+newMessage+lastMessage>=scrollHeight){
  /*setting the scrollTop value with .scrollTop method in jquery*/
  messages.scrollTop(scrollHeight)
}
}

socket.on('connect',()=>{
  console.log('Connected to server')
  var queryString=deparam(window.location.search)
  if(!window.location.search){
     swal ( "Oops" ,  "You must fill the Form" ,  "error" )
     .then(()=>{
        window.location.href='/'
     })

  }else{
    swal("You're arrived!", "Have a nice Chat", "success")
    .then(()=>{
      socket.emit('join',queryString)
    })
    console.log('No error')
  }
})

socket.on('disconnect',()=>{
  console.log('server is Disconnected')
})

socket.on('updateUserList',(users)=>{

var ul=$('<ul></ul>')
users.forEach(user=>ul.append($('<li></li>').text(user)))
$('#users').html(ul)



})

socket.on('newMessage',(message)=>{
  console.log(message)
  var timeMoment=moment(message.createdAt).format('Do MMM,ddd hh:mm A')
  var template=jQuery('#template-message').html()
  var html=Mustache.render(template,{
    from:message.from,
    createdAt:timeMoment,
    text:message.text
    })
  // var li=jQuery('<li></li>')
  // li.text(`${message.from} ${timeMoment}:${message.text}`)
  jQuery('#messages').append(html)
  autoScrolling()
})

socket.on('newLocation',(location)=>{
  console.log(location)
  var timeMoment=moment(location.createdAt).format('Do MMM,ddd hh:mm A')
  var template=jQuery('#template-location').html()
  var html=Mustache.render(template,{
    from:location.from,
    createdAt:timeMoment,
    url:location.url
  })
  // var li=jQuery('<li></li>'),
  //     a=jQuery('<a target="_blank">My Location</a>')
  //
  // li.text(`${location.from}:`)
  // a.attr('href',location.url)
  // li.append(a)
  jQuery('#messages').append(html)
  autoScrolling()
})

/*attached the event with jquery*/
jQuery('#message-form').on('submit',(event)=>{
  /*prevent the default behavior of the form*/
  var inputMessage=jQuery('[name=message]')
  event.preventDefault()
  socket.emit('createMessage',{
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
