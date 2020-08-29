const express =require('express')
const path=require('path')
const hbs=require('hbs')
var cors = require('cors')
const request=require('postman-request')
const geoCode=require('./utils/geoCode')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 9000
// Define paths for Express config
const publicDirPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
app.use(express.static('frontend'))

// Setup handlebars engine and views location

hbs.registerPartials(partialsPath)   //partial meaans the common tags .. like header or footer

//Setup static directory to serve
// app.use(express.static(publicDirPath))      //for static pages

//converting to dynamic page using npm hbs which seek the view folder int the dirpath
// hbs- handlebars , and plugin to express server used to create dynamic pages

app.use(cors())

app.get('',(req,res) => {
    //res.send('<h1>Hello Express!</h1>')\
    res.render('index',{
        name:'krsna',
        title:'Weather App'
    })
})

app.get('/help',(req,res)=>{
    // res.send([
    //     {
    //     name:'krsna',
    //     age:22
    // },
    // {
    //     name:'radhe',
    //     age:22
    // }
    // ])

    res.render('help',{
        message:'Hare Krsna !!',
        title:'Help page'
    })
})

app.get('/about',(req,res)=>{
    res.send('<h2>About page</h2>')
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){                 //https:localhost:9000/weather?address=new york
        return res.send({
            error:'address need to be provided'
        })
    }
    //console.log(req.query.address);
    const address=req.query.address
    geoCode(address,(error,{longitude,latitude,location}={})=>{
        if(error)
                return res.send({error})
        forecast(longitude,latitude,(error,{temperature})=>{
            if(error)
            return res.send({error})
           res.send({
                temperature:temperature,
                location:location,
                address:req.query.address
            })
        })
    })
   
})

app.get('*',(req,res)=>{
    res.send('<h3>404 ERROR page!!</h3>')
})

// app.com
// app.com/help
// app.com/about

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})
