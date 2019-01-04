require('../config/config')
var {expect}=require('chai')
var {generateMessage}=require('./generateMessage')
var {generateLocation}=require('./generateLocation')

describe('generateMessage',()=>{
  it('should generate correct  object',()=>{
      var from='Admin'
      var text='Hello'
      var message=generateMessage(from,text)
      expect(message.createdAt).to.be.a('number')
      expect(message).to.include({from,text})
  })
})

describe('generateLocation',()=>{
  it('should generate correct URL',()=>{
       var from='user',
           latitude=10,
           longitude=10
           url='https://www.google.com/maps?q=10,10'
           location=generateLocation(from,latitude,longitude)
       expect(location.createdAt).to.be.a('number')
       expect(location).to.include({from,url})

  })
})
