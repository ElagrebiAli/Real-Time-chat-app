/* uppercase the first letter of class is a just a styling convention in javascript*/
class Users{
  constructor(){
    this.users=[]
  }
  addUser(id,name,roomname){
      this.users.push({id,name,roomname})
      return {id,name,roomname}
}
  removeUser(id){
    let user=this.users.filter((user)=>user.id===id)[0]
    if(user){
      this.users=this.users.filter((user)=>user.id!=id)
      return user
    }

  }
  getRoomUserNameList(roomname){
    let users=this.users.filter((user)=>user.roomname===roomname)
    let usersName=users.map((user)=>user.name)
    return usersName
      }
  getUserId(id){
    return this.users.filter((user)=>user.id===id)[0]

  }

}

module.exports={Users}
