import { TodoList } from "../App";
import Todo from "./TodoComponent";
import service from "../services/fetch";
import Trophy from "./Trophy";
import { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import Confirm from "./Confirm";

export default function TodoListComponent({
  todoList,
  handleDeleteList,
}: {
  todoList: TodoList;
  handleDeleteList: (id: string) => void;
}) {
  const [todoListTitle, setTodoListTitle] = useState<string>(todoList.title);
  const [todoStatus, setTodoStatus] = useState<string>(todoList.status);
  const [edittedList, setEdittedList] = useState<TodoList>();
  const [todos, setTodos] = useState(todoList.todos);

  useEffect(() => {
    setEdittedList({
      id: todoList.id,
      createdAt: todoList.createdAt,
      title: todoListTitle,
      date: todoList.date,
      todos: todoList.todos,
      status: todoStatus,
    });
  }, [todoStatus, todoListTitle]);

  const handleDeleteTodo = (id: string) => {
    service.deleteTodo(id).then((res) => {
      console.log(res);
    });
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };
  const handleUpdate = () => {
    if (edittedList) {
      service.patchList(todoList.id, edittedList).then((res) => {
        console.log(res);
      });
    }
  };

  

  return (
    <>
      <li key={todoList.date}>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-4 mb-4 sm:flex-nowrap border-b border-gray-500">
          <div className="flex h-full items-end group">
            <div>
              <input
                onBlur={() => handleUpdate()}
                value={todoListTitle}
                onChange={(e) => setTodoListTitle(e.target.value)}
                type="text"
                placeholder="Title"
                className="bg-transparent transition-all duration-500 ease-in-out hover:cursor-text outline-none text-2xl"
                size={todoListTitle.length}
              />
              <div className=" text-xs flex leading-5 text-gray-500">
                {todoList.date}
                <Confirm
                  onConfirm={() => handleDeleteList(todoList.id)}
                  message="Are you sure you want to delete this list?"
                />
              </div>
            </div>
          </div>
          <div className="hover:trophy-completed pr-1">
            <Trophy todoStatus={todoStatus} />
          </div>
        </div>
        <div className="flex flex-col gap-4 ml-7 border-l border-b rounded-bl-2xl border-gray-500">
          {todos.map((todo, index) => {
            const isLast = index === todoList.todos.length - 1;

            return (
              <Todo
                isInCreateListComponent={false}
                key={todo.id + index}
                isLast={isLast}
                content={todo.content}
                description={todo.description}
                completed={todo.completed}
                priority={todo.priority}
                todoListTitle={todoListTitle}
                id={todo.id}
                handleDeleteTodo={handleDeleteTodo}
                isInBotComponent={false}
              />
            );
          })}
        </div>
      </li>
    </>
  );
}
