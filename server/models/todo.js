const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  priority: {
    type: String,
    required: false,
    minLength: 0,
  },
  content: {
    type: String,
    required: true,
    minlength: 1,
  },
  description: {
    type: String,
    required: false,
    minLength: 0,
  },
  completed: {
    type: Boolean,
    required: true,
  },
});

todoSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Todo", todoSchema);
