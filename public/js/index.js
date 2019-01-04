
$('#form-submitted').on('submit',()=>{
  var verif=check_username()
  if(verif){
    $('[name=name]').attr('readonly',true)
    $('submitButton').attr('disabled','disabled')
  }else{
    swal("Oops" ,  "Something went wrong!" ,  "error")
    // alert('please fill the form correctly')
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
    console.log(username.trim.length)
    msg('This field is required')
  }else{
    hide()
    var testExp = new RegExp(/^[a-zA-Z0-9]+$/)
    if(!testExp.test(username)){
      msg('Must not have any special characters')
    }else{
      if(username.trim().length<3 ||username.trim().length>10 ){
        msg('Must be at least 3 characters but no more than 10')
      }else{
        $('#submitButton').removeAttr('disabled')
        $('[name=name]').css("border-bottom","2px solid rgb(44, 62, 80)")
        return true
      }
    }
  }
}

$('[name=name]').on('input',()=>{
  check_username()
})

// $('#error_username').hide()
// var error_username=false
//
// function check_username()=>{
//   var testExp = new RegExp(/^[a-zA-Z0-9]+$/)
//   var username=$('[name=name]').val()
// }
