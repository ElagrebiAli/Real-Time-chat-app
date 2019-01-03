var generateLocation=(from,latitude,longitude)=>{
  return{
    from,
    url:`https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt:new Date().getTime()
  }
}

module.exports={generateLocation}
