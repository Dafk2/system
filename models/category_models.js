const { Schema, model } = require('mongoose')

const categorySchema = Schema({
  name: {
    type:String,
    required: [true, 'The name is required'],
    unique: [true, 'The name already exists in db']
  },

  description: {
    type: String,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  status: {
    type: Boolean,
    default: true
  },
})

categorySchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();

  return data;
}

module.exports = model('Category', categorySchema);