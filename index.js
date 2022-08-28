const express = require('express')

const app = express()

const server = app.listen(8080, () => console.log('Server up!'))

server.on('error', err => console.log(`Error en el servidor ${err}`))


// 1) Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:

const arrayHardcode = [
  {
    "title": "Escuadra",
    "price": 123.45,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    "id": 1
  },
  {
    "title": "Calculadora",
    "price": 234.56,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    "id": 2
  },
  {
    "title": "Globo Terráqueo",
    "price": 345.67,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    "id": 3
  }
 ];
 

// - A - Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
app.get('/productos', (request, response) => {
  response.send(arrayHardcode)
})

// - B - Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles
let counter = 0

app.get('/productoRandom', (request, response) => {
  let randomValue = arrayHardcode[Math.floor(arrayHardcode.length * Math.random())];
  response.send(randomValue)
})

