import axios from "axios";
import { TodoItem, TodoList } from "../App";

const listsUrl = "https://noycetodos.vercel.app/api/todoLists";
const todoUrl = "https://noycetodos.vercel.app/api/todos";
const getAllTodoLists = () => {
  const req = axios.get(listsUrl);
  return req.then((response) => response.data);
};

const getAllTodos = () => {
  const req = axios.get(todoUrl);
  return req.then((response) => response.data);

};

const postTodoList = (newObject: TodoList) => {
  const req = axios.post(listsUrl, newObject);
  return req.then((response) => response.data);
};

const putTodoList = (id: string, newObject: TodoList) => {
  const req = axios.put(`${listsUrl}/${id}`, newObject);
  return req.then((response) => response.data);
};

const patchTodo = (id: string, newObject: TodoItem) => {
  const req = axios.patch(`${todoUrl}/${id}`, newObject);
  return req.then((response) => response.data);
};

const patchList = (id: string, newObject: TodoList) => {
  const req = axios.patch(`${listsUrl}/${id}`, newObject);
  return req.then((response) => response.data);
};

const deleteTodo = (id: string) => {
  const req = axios.delete(`${todoUrl}/${id}`);
  return req.then((response) => response.data);
};

const deleteList = (id: string) => {
  const req = axios.delete(`${listsUrl}/${id}`);
  return req.then((response) => response.data);
};

export default {
  getAllTodoLists,
  postTodoList,
  putTodoList,
  patchTodo,
  patchList,
  deleteTodo,
  deleteList,
  getAllTodos
};
