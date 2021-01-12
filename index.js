require('dotenv').config()
const express = require('express')
const massive = require('massive')
const products_controller = require('./products_controller')

const app = express()
const { SERVER_PORT, CONNECTION_STRING } = process.env

app.use(express.json())


massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(dbInstance => {
    app.set('db', dbInstance)
}).catch(err => console.log(err))

//endpoints
app.post('/api/products', products_controller.create)
app.get('/api/products', products_controller.getAllProducts)
app.get('/api/products/:id', products_controller.getProduct)
app.put('/api/products/:id', products_controller.update)
app.delete('/api/products/:id', products_controller.delete)

app.listen(SERVER_PORT, () => {
    return console.log(`Server is running on ${SERVER_PORT}`)
});
