const request=require('postman-request')

const geoCode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2F1cmF2MTA5Njc3IiwiYSI6ImNrY3d6OHVvbjBpdzYycm1vY2w1Yjkxd3AifQ.85jTTm8XIoe3gFjKn0ykoA&limit=1'
    request({url,json:true},(error,{body})=>{   //url:url
        if(error)
            callback('Unable to connect the location service.',undefined)
        else if(body.features.length===0)
              callback('Unable to find the location . Try another search.',undefined)
        else{
            callback(undefined,{
                latitude:body.features[0].center[0],
                longitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports=geoCode