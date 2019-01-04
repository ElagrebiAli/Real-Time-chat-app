var {expect}=require('chai')
var {Users}=require('./users')
var users
beforeEach(()=>{
   users=new Users()
  users.users=[{
    id:'1',
    name:'example1',
  roomname:'Node course'},
  {
    id:'2',
    name:'example2',
    roomname:'Angular course'
  },{
    id:'3',
    name:'example3',
    roomname:'Node course'
  }]
})


describe('Users class',()=>{
 it('should add user if not exist',()=>{
   let user={
     id:'1',
     name:'ali',
     roomname:'React Course'
   }
   let  users=new Users()
   let resAddUser=users.addUser(user.id,user.name,user.roomname)
   /*you must not use to.equal because it's a core mechanic of javascript(===) not of chai.js and will be fail because the equality in javascript
   is strict ,that's mean it's testing if the two expression (on the left and the right) is referring to the same point in memory,and in our case will
   return false because each expression has it's own address in memory : try [1]===[1] in the console and u will understand it
   so in this case u must use deep equality in chai.js */
   expect(users.users).to.eql([user])
 })

 it('should find user by id if exist',()=>{
   let user=users.getUserId('3')
   expect(user.id).to.equal('3')
 })
 it('should not find user if not exist',()=>{
   let user=users.getUserId('123')
   expect(user).to.not.exist
 })

 it('should remove user if exist',()=>{
   let user=users.removeUser('1')
   expect(user.id).to.equal('1')
   expect(users.users.length).to.equal(2)

 })
 it('should not remove user if not exist',()=>{
   let user=users.removeUser('5')
   /*expect undefined*/
   expect(user).to.not.exist
   expect(users.users.length).to.equal(3)
 })
it('should return users in node course',()=>{
   let userList=users.getRoomUserNameList('Node course')
   expect(userList).to.eql(['example1','example3'])
})
it('should return users in angular course',()=>{
   let userList=users.getRoomUserNameList('Angular course')
   expect(userList).to.eql(['example2'])
})
})
