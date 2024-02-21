import {
  MinusIcon,
  PlusCircleIcon,
  PlusIcon,
  PuzzlePieceIcon,
  CpuChipIcon
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useState } from "react";
import CreateTodos from "./CreateTodo";
import { ExpansionProps, TodoItem, TodoList } from "../App";
import TodoComponent from "./TodoComponent";
import service from "../services/fetch";
import { StateContext, StateContextType } from "../State";
import Todo from "./TodoComponent";

export default function BotComponent({
  handleExpand,
  isExpanded,
}: ExpansionProps) {
  const { todos, setTodos, botOpen, setBotOpen } =
    useContext<StateContextType>(StateContext);
  const [currentTodos, setCurrentTodos] = useState<TodoItem[]>();
  useEffect(() => {
    setCurrentTodos(todos);
  }, [todos]);
  const submittedTodos = todos.length >= 1;

  return (
    <div className="whitespace-nowrap w-full flex justify-center transition-all duration-500">
     
        <button className={`mr-2 absolute flex p-2 transition-all ${isExpanded ? 'opacity-100 duration-[2s]' : 'opacity-0 duration-0'}`} onClick={handleExpand}>
          <MinusIcon className="h-8 w-8" />
        </button>
     

      <div
        className={`w-full p-4 transition-all duration-500 ${
          isExpanded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex bg-white">
          
        </div>
      </div>
      <div className={`w-full p-5 transition-all duration-500  ${
          isExpanded ? "opacity-100" : "opacity-0"
        }`}
        
        >
        {currentTodos?.map((todo, index) => (
          <Todo
            isInCreateListComponent={false}
            key={todo.id + index}
            isLast={false}
            content={todo.content}
            description={todo.description}
            completed={todo.completed}
            priority={todo.priority}
            todoListTitle=""
            id={todo.id}
            handleDeleteTodo={() => void 0}
            isInBotComponent={true}
          />
        ))}
      </div>

     
        <button className={`absolute bottom-0 top-0 transition-all ${!isExpanded ? 'opacity-100 duration-[2s] h-auto' : 'opacity-0 duration-0 h-14'}`} onClick={handleExpand}>
          <CpuChipIcon className="h-8 w-8" />
        </button>
      
    </div>
  );
}
