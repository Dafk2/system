const { model, Schema } = require('mongoose');

const userSchema = Schema({
  name: {
    type: String,
    requred: [true, 'The name is required']
  },

  password: {
    type: String,
    requred: [true, 'The password is required']
  },

  email: {
    type: String,
    required: [true, 'The email is required'],
    unique: true
  }, 

  status: {
    type: Boolean,
    default: true
  },

  role: {
    type: String,
    required: [true, 'The role is required'],
    emun: ['USER_ROLE', 'ADMIN_ROLE'],
    default: 'USER_ROLE'
  }
})

userSchema.methods.toJSON = function () {
   const { __v, password, ...params } = this.toObject();

   return params
}

module.exports = model('User', userSchema);


