const request =require('postman-request')

const forecast=(longitude,latitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=7a051c386d08cfa3799fd7b3200b41fc&query='+longitude+','+latitude
    request({url:url,json:true},(error,{body})=>{
        if(error)
           callback('Unable to locate the forecast server.',undefined);
        else if(body.error)
           callback('Unable to track your location',undefined);
        else{
            callback(undefined,{
                temperature:body.current.temperature
            })
        }
    })
}

module.exports=forecast