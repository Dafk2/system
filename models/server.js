const os = require('os')
const http = require('http')
const express = require('express');
const cors = require('cors');

// my functions 
const dbConnect = require('../db/config.js');dbConnect
const { socketControllers } = require('../sockets/sockets_controllers.js')

// routes
const userRoutes = require('../routes/user_routes.js');
const userAuth = require('../routes/auth_routes');
const categoryRoutes = require('../routes/category_routes')
const productRoutes = require('../routes/product_routes')
const searchCollection = require('../routes/search_routes.js')

class Server {
  constructor () {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = require('socket.io')(this.server)
    this.port = process.env.PORT;

    // middlewares
    this.middleware();

    // routes
    this.routes();

    // my functions
    this.connectionDB();

    this.socketEvents();
  }

  listen () {
    this.server.listen(this.port, () => {
      console.clear()
      console.log(`server on port ${this.port}`)
    })
  }

  middleware () {
    this.app.use(express.static('public'))
    this.app.use(express.json())
    this.app.use(cors())
  }

  routes () {
    this.app.use('/api/user', userRoutes)
    this.app.use('/api/auth', userAuth)
    this.app.use('/api/category', categoryRoutes)
    this.app.use('/api/products', productRoutes)
    this.app.use('/api/search', searchCollection)
  }

  socketEvents () {
    this.io.on('connection', (socket) => socketControllers(socket, this.io))
  }

  async connectionDB () {
    await dbConnect();
  }
}

module.exports = Server