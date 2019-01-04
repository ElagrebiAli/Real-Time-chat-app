var socket=io()
var verif
$('#form-submitted').on('submit',()=>{

  if(verif){
    $('[name=name]').attr('readonly',true)
    $('#submitButton').attr('disabled','disabled')
  }else{
    swal("Oops" ,  "You forget to fill the Room name field!" ,  "error")

    /*return false to not active the action of the form*/
    return false
  }

})

function check_username(){
  var username=$('[name=name]').val()
  console.log(username)
  function msg(errmsg){
    $('.error_username').html(errmsg).show()
    $('.error_username').css({'border-bottom':'2px solid rgba(231, 76, 60,0.7)','font-size':'15px','font-family':'"Comic Sans MS", cursive, sans-serif'})
  }
  function hide(){
    $('.error_username').hide()
  }
  if(username.trim().length===0){
    $('#submitButton').attr('disabled','disabled')
    msg('This field is required')
  }else{
    hide()
    var testExp = new RegExp(/^[a-zA-Z0-9]+$/)
    if(!testExp.test(username)){
      $('#submitButton').attr('disabled','disabled')
      msg('Must not have any special characters')
    }else{
      if(username.trim().length<3 ||username.trim().length>10 ){
        $('#submitButton').attr('disabled','disabled')
        msg('Must be at least 3 characters but no more than 10')
      }else{
         $('[name=name]').css("border-bottom","2px solid rgb(44, 62, 80)")
        $('#submitButton').removeAttr('disabled')

          }
        }
      }
    }
  function check_roomname(){

    var roomname=$('[name=roomname]').val()

    var username=$('[name=name]').val()
    if(username){
      socket.emit('testExistName',{
        username,
        roomname
      })
      socket.on('existName',(data)=>{
        console.log(data)
        if(data.val){
        swal("Oops" ,  `Someone already in ${roomname} with this username:${username}!` ,  "error")
        $('#submitButton').attr('disabled','disabled')

         }else{
           $('#submitButton').removeAttr('disabled')
           verif=true



        }
      })
    }

  }

$('[name=name]').on('input',()=>{
  check_username()
})
$('[name=roomname]').on('input',()=>{
console.log($('[name=roomname]').val())
  check_roomname()
})
