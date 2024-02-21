import { useContext, useEffect, useRef, useState } from "react";
import CheckBox from "./Checkbox";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Priority from "./Priority";
import { TodoItem, TodoList } from "../App";
import service from "../services/fetch";
import { StateContext, StateContextType } from "../State";
function classes(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Todo({
  content,
  priority,
  description,
  completed,
  isLast,
  todoListTitle,
  id,
  handleDeleteTodo,
  isInCreateListComponent,
  isInBotComponent,
}: {
  content: string;
  priority: string;
  description: string;
  completed: boolean;
  isLast: boolean;
  todoListTitle: string;
  id: string;
  handleDeleteTodo: (id: string) => void;
  isInCreateListComponent: boolean;
  isInBotComponent: boolean;
}) {
  const [hasIntereacted, setHasInteracted] = useState<boolean>(false);
  const [openDescription, setOpenDescription] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(completed);
  const [todoContent, setTodoContent] = useState<string>(content);
  const [todoPriority, setTodoPriority] = useState<string>(priority);
  const [todoDescription, setTodoDescription] = useState<string>(description);
  const textareaRef = useRef(null);
  const [pHeight, setPHeight] = useState("0px");
  const [edittedTodoList, setEdittedTodoList] = useState<TodoItem>();

  useEffect(() => {
    setEdittedTodoList({
      id: "",
      content: todoContent,
      description: todoDescription,
      priority: todoPriority,
      completed: done,
    });
  }, [todoContent, todoDescription, todoPriority, done]);

  const handleUpdate = () => {
    if (!isInCreateListComponent) {
      if (hasIntereacted && edittedTodoList) {
        service.patchTodo(id, edittedTodoList).then((res) => {
          console.log(res);
        });
      }
    }
  };

  useEffect(() => {
    if (openDescription && textareaRef.current) {
      setPHeight(
        `${(textareaRef.current as HTMLTextAreaElement).scrollHeight}px`
      );
    } else {
      setPHeight("0px");
    }
  }, [openDescription]);
  const handleDescriptionClick = () => {
    setOpenDescription(!openDescription);
  };

  const handleInput = () => {
    if (textareaRef.current) {
      setPHeight(
        `${(textareaRef.current as HTMLTextAreaElement).scrollHeight}px`
      );
    }
  };

  const placeholder = "Content";

  const handleChecked = () => {
    setHasInteracted(true);
    setDone(!done);
  };

  const high = priority === "High";
  const bgColor = "bg-red-500/25";

  return (
    <div
      key={content}
      className={classes(
        isLast ? "rounded-bl-xl " : "border-b border-gray-500",
        `flex flex-col items-start gap-x-4 gap-4 pl-4 py-4 text-[15px] transition-all duration-500 ease-in-out ${
          todoPriority === "High" ? bgColor : ""
        }`
      )}
    >
      <div className="flex justify-between w-full pr-1">
        <div className="flex gap-2">
          {!isInBotComponent ? (
            <div onClick={() => handleChecked()}>
              <CheckBox checked={done} />
            </div>
          ) : null}
          <input
            onBlur={() => handleUpdate()}
            value={todoContent}
            onChange={(e) => {
              setHasInteracted(true);
              setTodoContent(e.target.value);
            }}
            type="text"
            placeholder="Content"
            className="bg-transparent transition-all w-[100%] duration-500 ease-in-out hover:cursor-text outline-none "
            size={
              todoContent.length > 0 ? todoContent.length : placeholder.length
            }
          />
          <div className="flex">
            <Priority
              handleUpdate={() => {
                setHasInteracted(true);
                handleUpdate();
              }}
              priority={todoPriority}
              setPriority={setTodoPriority}
              isInBotComponent={isInBotComponent}
            />
            <div
              onClick={handleDescriptionClick}
              className="hover:cursor-pointer flex justify-center items-center"
            >
              {!isInBotComponent ? (
                <>
                  {openDescription ? (
                    <ChevronDownIcon className="h-4 w-4" />
                  ) : (
                    <ChevronRightIcon className="h-4 w-4" />
                  )}
                </>
              ) : null}
            </div>
          </div>
        </div>
        {!isInBotComponent ? (
          <div onClick={() => handleDeleteTodo(id)}>
            <TrashIcon className="h-4 w-4 mt-2 mr-[7px] hover:scale-125 transition-all duration-500 hover:cursor-pointer" />
          </div>
        ) : null}
      </div>

      <p
        className={`flex pl-10 h-full transition-all w-[50%] duration-500 ease-in-out overflow-hidden`}
        style={{ height: pHeight }}
      >
        <textarea
          onBlur={() => handleUpdate()}
          ref={textareaRef}
          value={todoDescription}
          onChange={(e) => {
            setHasInteracted(true);
            setTodoDescription(e.target.value);
          }}
          onInput={handleInput}
          placeholder="Description"
          className="bg-transparent w-full h-full flex transition-all duration-500  ease-in-out hover:cursor-text outline-none resize-none scrollbar-hide"
        />
      </p>
    </div>
  );
}
