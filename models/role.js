const { model, Schema } = require('mongoose')

const roleSchema = Schema({
  role: {
    type: String,
    required: [true, 'The role is required']
  }
})

module.exports = model('role', roleSchema)