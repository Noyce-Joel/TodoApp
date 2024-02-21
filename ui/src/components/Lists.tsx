import { useContext, useEffect, useState } from "react";
import { StateContext, StateContextType } from "../State";
import TodoListComponent from "./TodoListComponent";
import { TodoList } from "../App";
import service from "../services/fetch";

export default function Lists() {
  const { todoLists, setTodoLists } =
    useContext<StateContextType>(StateContext);
  todoLists.forEach((list) => {
    if (list.todos.length === 0) {
      setTodoLists(todoLists.filter((l) => l.id !== list.id));
      service.deleteList(list.id).then((res) => {
        console.log(res);
      });
    }
  });

  const handleDeleteList = (id: string) => {
    setTodoLists(todoLists.filter((l) => l.id !== id));
    service.deleteList(id).then((res) => {
      console.log(res);
    });
  };
  return (
    <ul className="flex flex-col w-screen ml-5 pl-4">
      {todoLists.map((todoList) => (
        <TodoListComponent key={todoList.id} handleDeleteList={handleDeleteList} todoList={todoList} />
      ))}
    </ul>
  );
}
