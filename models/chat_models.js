class Message {
  constructor (uid, name, message) {
    this.uid = uid
    this.name = name
    this.message = message
  }
}

class ChatMessages {
  constructor () {
    this.messages = []
    this.users = {}
  }

  // last 10 messages
  get last10 () {
    this.messages = this.messages.splice(0, 10)

    return this.messages
  }

  get usersArr () {
    return Object.values(this.users)
  }

  connectUser (user) {
    this.users[user.id] = user
  }

  sendMessage (uid, name, mesagge) {
    this.messages.unshift(new Message(uid, name, mesagge))
  }

  disconnectUser (id) {
    delete this.users[id]
  }
}

module.exports = ChatMessages