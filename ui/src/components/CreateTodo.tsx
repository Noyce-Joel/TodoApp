import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useRef } from "react";
import { TodoItem, TodoList } from "../App";

function classes(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default function CreateTodos({
  listCreated,
  todos,
  setTodos,
  content,
  setContent,
  priority,
  setPriority,
  description,
  setDescription,
  setNewTodoList,
}: {
  listCreated: boolean;
  todos: TodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  priority: string;
  setPriority: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setNewTodoList: React.Dispatch<React.SetStateAction<TodoList>>;
}) {
  const descriptionRef = useRef<HTMLTextAreaElement>(null); // Add type assertion
  const isLast = true;
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
    if (descriptionRef.current) {
      descriptionRef.current.style.height = "inherit";
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
    }
  };

  const handleTodoSubmit = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const newTodo = {
      id: "",
      content: content,
      description: description,
      priority: priority,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setNewTodoList((prev) => {
      return {
        ...prev,
        todos: [...todos, newTodo],
      };
    });
    setContent("");
    setPriority("");
    setDescription("");
  };

  return (
    <>
      {listCreated ? (
        <div className="flex flex-col gap-4 ml-7 mb-4 border-l border-b rounded-bl-2xl border-gray-500">
          <fieldset
            key="todo"
            className={classes(
              isLast ? "" : "border-b border-gray-500",
              "flex flex-col items-start gap-x-4 gap-4 pl-4 py-4"
            )}
          >
            <div className="flex justify-between w-full">
              <p className=" flex items-center justify-center w-full gap-2 grow border-gray-500">
                <button onClick={handleTodoSubmit}>
                  <PlusCircleIcon className="h-6 w-6" />
                </button>
                <input
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="bg-transparent hover:cursor-text outline-none grow"
                  placeholder="Task"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleTodoSubmit(event);
                    }
                  }}
                />
              </p>

              <select
                value={priority}
                onChange={(e) =>
                  setPriority((prevPriority) => prevPriority + e.target.value)
                }
                className="bg-transparent hover:cursor-pointer outline-none text-xs"
              >
                <option value="High">High</option>
                <option value="Mid">Mid</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <p className="flex w-full h-full">
              <textarea
                ref={descriptionRef}
                value={description}
                onChange={handleDescriptionChange}
                className="bg-transparent hover:cursor-text outline-none grow"
                placeholder="Description"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleTodoSubmit(event);
                  }
                }}
              />{" "}
            </p>
          </fieldset>
        </div>
      ) : null}
    </>
  );
}
