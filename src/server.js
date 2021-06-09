const app = require('./app')

// Importante para o funcionamento do docker
const HOST = '0.0.0.0'
const PORT = 3333;

app.listen(PORT, HOST);