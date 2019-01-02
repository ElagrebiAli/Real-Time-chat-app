require('../config/config')
var {expect}=require('chai')
var {generateMessage}=require('./generateMessage')

describe('generateMessage',()=>{
  it('should generate correct  object',()=>{
      var from='Admin'
      var text='Hello'
      var message=generateMessage(from,text)
      expect(message.createdAt).to.be.a('number')
      expect(message).to.include({from,text})
  })
})
