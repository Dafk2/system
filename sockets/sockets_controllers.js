const { socketValidateTokent } = require('../helpers/generate_jwt.js');
const ChatMessages = require('../models/chat_models.js');
const chat = new ChatMessages()


const socketControllers = async (socket, io) => {
  const token = socket.handshake.headers['Authorization-Token'];
  // const user = await socketValidateTokent(token);
  
  // if(!user) {
  //   return socket.disconnect()
  // }

  console.log(`logged on ${user.name}`)

  chat.connectUser(user)

  io.emit('active-users', chat.usersArr)
  socket.emit('receive-messages', chat.last10)

  socket.join(user.id)

  socket.on('disconnect', () => {
    chat.disconnectUser(user.id)
    io.emit('active-users', chat.users)
  })

  socket.on('send-message', ({esMessage, esUid}) => {
    if(esUid) {
      socket.to(esUid).emit('private-message', { user:user.name, esMessage })
    }

    else {
      chat.sendMessage(user.id, user.name, esMessage)
      io.emit('receive-messages', chat.last10)
    }
  })

  socket.on('disconnect', () => {
    console.log('Client disconnect')
  })
}

module.exports = {
  socketControllers
}