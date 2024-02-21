const mongoose = require('mongoose');
const Todo = require('./todo'); // Assuming todo.js is in the same directory

const todoListSchema = new mongoose.Schema({

  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  date: {
    type: String,
    required: true,
    minLength: 5
  },
  title: {
    type: String,
    required: true,
    minlength: 1,
  },
  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Todo'
  }],
  status: {
    type: String,
    required: false,
    minLength: 5
  }
});

todoListSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  });

module.exports = mongoose.model('TodoList', todoListSchema);