import React, { createContext, useEffect, useState } from "react";
import { TodoItem, TodoList } from "./App";
import service from "./services/fetch";
export const StateContext = createContext<StateContextType>({
  todoLists: [],
  setTodoLists: () => {},
  todos: [],
  setTodos: () => {},
  mobileMenuOpen: false,
  setMobileMenuOpen: () => {},
  botOpen: false,
  setBotOpen: () => {},
});

export interface StateContextType {
  todoLists: TodoList[];
  setTodoLists: React.Dispatch<React.SetStateAction<TodoList[]>>;
  todos: TodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  botOpen: boolean;
  setBotOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [todoLists, setTodoLists] = useState<TodoList[]>([]);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [botOpen, setBotOpen] = useState<boolean>(false);
  const [todoPriority, setTodoPriority] = useState<string>("");
  const sortLists = (todoLists: TodoList[]) => {
    const sortedLists = todoLists.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    setTodoLists(sortedLists);
  };
  console.log(todoLists);
  useEffect(() => {
    service
      .getAllTodoLists()
      .then((todoLists) => {
        setTodoLists(todoLists);
        sortLists(todoLists);
      })
      .catch((error) => {
        console.error(error);
      });
    service
      .getAllTodos()
      .then((todos) => {
        setTodos(todos);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  
  

  return (
    <StateContext.Provider
      value={{
        todoLists,
        setTodoLists,
        todos,
        setTodos,
        mobileMenuOpen,
        setMobileMenuOpen,
        botOpen,
        setBotOpen,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
