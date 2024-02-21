import {
  MinusIcon,
  PlusCircleIcon,
  PlusIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { useContext, useState } from "react";
import CreateTodos from "./CreateTodo";
import { ExpansionProps, TodoItem, TodoList } from "../App";
import TodoComponent from "./TodoComponent";
import service from "../services/fetch";
import { StateContext, StateContextType } from "../State";

export default function CreateList({
  handleExpand,
  isExpanded,
}: ExpansionProps) {
  const [listCreated, setListCreated] = useState<boolean>(false);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const { todoLists, setTodoLists } =
    useContext<StateContextType>(StateContext);
  const [newTodoList, setNewTodoList] = useState<TodoList>({
    id: "",
    createdAt: new Date(),
    date: new Date().toLocaleDateString(),
    title: "Example Title",
    todos: [],
    status: "active",
  });
  const [listTitle, setListTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [priority, setPriority] = useState<string>("Low");
  const [description, setDescription] = useState<string>("");
  const displayTodos = () => {
    if (listTitle.length > 0) {
      setListCreated(!listCreated);
      setNewTodoList({
        ...newTodoList,
        date: new Date().toLocaleString(),
        title: listTitle,
      });
    }
  };
  const randomNumber = Math.floor(Math.random() * 1000);
  const todosToSubmit = todos;

  const handleListSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const currTodoList = {
      id: "",
      createdAt: new Date(),
      date: new Date().toLocaleDateString(),
      title: listTitle,
      todos: todos,
      status: "active",
    };

    setNewTodoList(currTodoList);
    setTodoLists([...todoLists, newTodoList]);

    if (newTodoList) {
      service
        .postTodoList(currTodoList)
        .then((res) => {
          service
            .getAllTodoLists()
            .then((todoLists) => {
              setTodoLists(todoLists);
            })
            .catch((error) => {
              console.error(error);
            });
          setListTitle("");
          setTodos([]);
          setDescription("");
          setContent("");
          setPriority("low");
          setListCreated(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const submittedTodos = todos.length >= 1;

  return (
    <>
      
        <button className={`flex py-5 transition-all ease-in-out  ${isExpanded ? 'opacity-100 duration-1000' : 'opacity-0 duration-0'}`} onClick={handleExpand}>
          <XMarkIcon className="h-6 w-6 stroke-gray-500" />
        </button>
     

      {isExpanded &&
        <fieldset className="flex w-full">
          <ul className="flex flex-col pl-4 w-full">
            <li>
              <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-4 mb-4 sm:flex-nowrap border-b border-gray-500">
                <div>
                  <input
                    value={listTitle}
                    onChange={(e) => setListTitle(e.target.value)}
                    type="text"
                    placeholder="Create List"
                    className="bg-transparent transition-all duration-500 ease-in-out hover:cursor-text outline-none text-2xl"
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        displayTodos();
                      }
                    }}
                  />
                  <p className=" text-xs leading-5 text-gray-500">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
                <button
                  tabIndex={1}
                  onClick={displayTodos}
                  
                >
                  {listCreated ? null : <PlusCircleIcon className="h-6 w-6" />}
                </button>
              </div>
              <CreateTodos
                setContent={setContent}
                setPriority={setPriority}
                setDescription={setDescription}
                content={content}
                priority="Low"
                description={description}
                listCreated={listCreated}
                todos={todos}
                setTodos={setTodos}
                setNewTodoList={setNewTodoList}
              />

              {submittedTodos ? (
                <>
                  <div className="flex flex-col gap-4 ml-7 border-l border-b rounded-bl-2xl border-gray-500 mb-4">
                    {todos.map((todo, index) => {
                      const isLast = index === todos.length - 1;

                      return (
                        <TodoComponent
                          isInBotComponent={false}
                          isInCreateListComponent={true}
                          key={index}
                          isLast={isLast}
                          content={todo.content}
                          description={todo.description}
                          completed={todo.completed}
                          priority={todo.priority}
                          todoListTitle={listTitle}
                          id=""
                          handleDeleteTodo={() => void 0}
                        />
                      );
                    })}
                  </div>
                  <div className="flex w-full justify-end items-center mx-auto">
                    <button
                      onClick={(e) => {
                        handleListSubmit(e);
                      }}
                      className="border p-2 rounded-xl w-fit ml-7 "
                    >
                      Create List
                    </button>
                  </div>
                </>
              ) : null}
            </li>
          </ul>
        </fieldset>
     }
        <button className={`${isExpanded ?  'opacity-0 duration-100' : 'opacity-100 duration-[2s]'} 'transition-all border border-gray-500 rounded-full p-1.5 ease-in-out '`} onClick={handleExpand}>
          <PlusIcon className="h-8 w-8 hover:scale-125 transition-all duration-500" />
        </button>
      
    </>
  );
}
