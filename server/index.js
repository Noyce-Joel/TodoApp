require("dotenv").config();
const express = require("express");
const app = express();
const Todo = require("./models/todo");
const TodoList = require("./models/todoList");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const url =
  process.env.MONGODB_URI

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB:', error));

const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body: ", req.body);
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, req, res, next) => {
  console.log(error.message);
  if (error.message === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.message === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use(requestLogger);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/todoLists", (req, res) => {
  TodoList.find({})
    .populate("todos")
    .then((todoList) => {
      res.json(todoList);
    })
    .catch((error) => {
      res.status(500).send("Error: " + error);
    });
});

app.get("/api/todos", (req, res) => {
  Todo.find({})
    .then((todos) => {
      res.json(todos);
    })
    .catch((error) => {
      res.status(500).send("Error: " + error);
    });
}
);

app.get("/api/todoLists/:id", (req, res) => {
  const id = req.params.id;
  TodoList.findById(id)
    .populate("todos")
    .then((todoList) => {
      if (todoList) {
        res.json(todoList);
      } else {
        res.status(404).send("Todo not found");
      }
    })
    .catch((error) => {
      res.status(500).send("Error: " + error);
    });
});

app.post("/api/todoLists", (req, res) => {
  const body = req.body;

  const todos = body.todos.map((todo) => {
    const newTodo = new Todo({
      priority: todo.priority,
      content: todo.content,
      description: todo.description,
      completed: todo.completed,
    });
    newTodo.save();
    return newTodo;
  });

  const todoList = new TodoList({
    date: body.date,
    title: body.title,
    todos: todos,
    status: body.status,
  });

  todoList.save().then((savedTodoList) => {
    res.json(savedTodoList);
  });
});

app.delete("/api/todoLists/:id", (req, res) => {
  const id = req.params.id;
  TodoList.findById(id)
    .then((todoList) => {
      Todo.deleteMany({ _id: { $in: todoList.todos } })
        .then(() => {
          TodoList.findByIdAndDelete(id)
            .then((todo) => {
              res.json(todo);
            })
            .catch((error) => {
              res.status(500).send("Error deleting todo list: " + error);
            });
        })
        .catch((error) => {
          res.status(500).send("Error deleting associated todos: " + error);
        });
    })
    .catch((error) => {
      res.status(500).send("Error finding todo list: " + error);
    });
});

app.delete("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  Todo.findByIdAndDelete(id)
    .then((todo) => {
      res.json(todo);
    })
    .catch((error) => {
      res.status(500).send("Error: " + error);
    });
});

app.put("/api/todoLists/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const todoIds = [];
  for (const todo of body.todos) {
    const newTodo = new Todo({
      priority: todo.priority,
      content: todo.content,
      description: todo.description,
      completed: todo.completed,
    });
    await newTodo.save();
    todoIds.push(newTodo._id);
  }

  const updatedTodoList = {
    date: body.date,
    title: body.title,
    todos: todoIds,
    completed: body.completed,
  };

  TodoList.findByIdAndUpdate(id, updatedTodoList, { new: true })
    .populate("todos")
    .then((updatedItem) => {
      res.json(updatedItem);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error: " + error);
    });
});

app.patch("/api/todos/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const todo = {
    priority: body.priority,
    content: body.content,
    description: body.description,
    completed: body.completed,
  };

  Todo.findByIdAndUpdate(id, todo, { new: true })
    .then((updatedItem) => {
      res.json(updatedItem);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error: " + error);
    });
});

app.patch("/api/todoLists/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const todoList = {
    title: body.title,
    status: body.status,
  };
  TodoList.findByIdAndUpdate(id, todoList, { new: true })
    .populate("todos")
    .then((updatedItem) => {
      res.json(updatedItem);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error: " + error);
    });
});

app.use(errorHandler);
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
