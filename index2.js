const express = require('express')

const fs = require ('fs');

const app = express()

const server = app.listen(8080, () => console.log('Server up!'))

server.on('error', err => console.log(`Error en el servidor ${err}`))


// 2) Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.

// Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior.

const pathToFile = './productos.txt';

class Manager {
    save = async (user) => {
        //validations
        if(!user.title || !user.price || !user.thumbnail) return {status: "error", message: "missing fields"}
        try {
            if(fs.existsSync(pathToFile)) {
                let data = await fs.promises.readFile(pathToFile, 'utf-8')
                let users = JSON.parse(data)
                let id = users[users.length-1].id+1
                user.id = id
                users.push(user)
                await fs.promises.writeFile(pathToFile, JSON.stringify(users, null, 2))
                return {status: "success", message: "User created"}
            } else {
                user.id = 1;
                await fs.promises.writeFile(pathToFile, JSON.stringify([user], null, 2));
                return {status: "success", message: "User created"}
            }
        } catch(err) {
            return {status: "error", message: err.message}
        }
    }

    getAll = async() => {
        if (fs.existsSync(pathToFile)) {
            let data = await fs.promises.readFile(pathToFile, 'utf-8')
            let users = JSON.parse(data)
            return users
        } else {
            return {status: "error", message: err.message}
        }
    }

}

const manager = new Manager()

let user = {
    "title": "Globo Terráqueo",
    "price": 345.67,
    "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
}

// metodo utilizado para guardar el array en productos.txt:
// manager.save(user).then(result => console.log(result))


// - A - Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor

let lol = []
manager.getAll().then(result => lol = result)

app.get('/productos', (request, response) => {
  response.send(lol)
})

// - B - Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles

app.get('/productoRandom', (request, response) => {
  let randomValue = lol[Math.floor(lol.length * Math.random())];
  response.send(randomValue)
})

