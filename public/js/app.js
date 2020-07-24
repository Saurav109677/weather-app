

console.log("Client side javascript file is loaded")

fetch('http://localhost:9000/weather?address=12what').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})