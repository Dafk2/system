const { Schema, model } = require('mongoose')

const productSchema = Schema({
  name: {
    type: String,
    required: [true, 'The name is required'],
    unique:[true, 'The name already exists in db']
  },

  description: {
    type: String
  },

  status: {
    type: Boolean,
    default: true
  },

  price: {
    type: Number,
    required: [true, 'The price is required']
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    require: [true, 'The category is required'] 
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  avalible: {
    type: Boolean,
    default: true
  },

  img: {
    type: String
  }
})

productSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();

  return data;
}

module.exports = model('Product', productSchema)