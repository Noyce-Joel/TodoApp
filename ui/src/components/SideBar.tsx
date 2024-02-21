/* eslint-disable react-refresh/only-export-components */
import { HomeIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Priority from "./Priority";
import { StateContext, StateContextType } from "../State";
import { TodoItem } from "../App";
import service from "../services/fetch";
const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: true },
  {
    name: "Tasks",
    href: "/tasks",
    icon: ListBulletIcon,
    count: "5",
    current: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default React.memo(function Example() {
 
  const {todos, setTodos} = useContext<StateContextType>(StateContext);
  const { mobileMenuOpen, setMobileMenuOpen } =
    useContext<StateContextType>(StateContext);

  const [updatedTodos, setUpdatedTodos] = useState<TodoItem[]>(todos);

  console.log(todos)

  useEffect(() => {
    const highPriority = todos?.filter((todo) => todo.priority === "High");
    setUpdatedTodos(highPriority);
  }, [todos]);

  const priorities = updatedTodos?.map((p) => ({
    id: p.id,
    name: p.content,
    href: "#",
    initial: p.content.charAt(0),
    current: false,
  }));

  return (
    <div className="relative">
      {mobileMenuOpen ? (
        <div
          onMouseEnter={() => setMobileMenuOpen(false)}
          className="transition-all  duration-500 ease-in-out w-[75px] pt-5 flex h-screen flex-col gap-y-5 overflow-y-auto border-r-[0.5px] text-white border-gray-500 px-6"
        >
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-50 text-[#2f3340]"
                            : "text-white hover:text-[#2f3340] hover:bg-gray-50",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold "
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-[#2f3340]"
                              : "text-white group-hover:text-[#2f3340]",
                            "h-6 w-6 shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <div className="relative h-6 opacity-100 transition-all duration-500">
                  <div className="absolute left-[7px] top-[2px]">
                    <svg
                      viewBox="0 0 2 2"
                      className={`justify-center hover:scale-125 flex items-center h-[9.5px] w-[9.5px] fill-red-500`}
                    >
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                  </div>
                </div>

                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {priorities.map((priority, index) => (
                    <li key={index}>
                      <a
                        href={priority.href}
                        className={classNames(
                          priority.current
                            ? "bg-gray-50 text-[#2f3340]"
                            : "text-white hover:text-[#2f3340] hover:bg-gray-50",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <span
                          className={classNames(
                            priority.current
                              ? "text-indigo-600 border-indigo-600"
                              : "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600",
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                          )}
                        >
                          {priority.initial}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <div
          onMouseLeave={() => setMobileMenuOpen(true)}
          className="transition-all pt-5 h-screen duration-500 ease-in-out flex flex-col gap-y-5 w-[300px] overflow-y-auto border-r-[0.5px] text-white border-gray-500 px-6"
        >
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-50 text-[#2f3340]"
                            : "text-white hover:text-[#2f3340] hover:bg-gray-50",
                          "group flex gap-x-3 rounded-md p-2 text-[15px] leading-6 font-semibold "
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-[#2f3340]"
                              : "text-white group-hover:text-[#2f3340]",
                            "h-6 w-6 shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}

                        {item.count ? (
                          <span
                            className="ml-auto w-5 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 -mt-1 flex justify-center items-center text-center text-xs font-medium leading-5 text-[#2f3340] group-hover:text-white group-hover:bg-[#2f3340] ring-1 ring-inset ring-gray-200"
                            aria-hidden="true"
                          >
                            {item.count}
                          </span>
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="flex-nowrap">
                <div className="relative h-6 opacity-100 transition-all duration-500">
                  <div className="absolute left-[7px] top-[2px]">
                    <svg
                      viewBox="0 0 2 2"
                      className={`justify-center hover:scale-125 flex items-center h-[9.5px] w-[9.5px] fill-red-500`}
                    >
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                  </div>
                  {mobileMenuOpen ? null : (
                    <p className="flex text-xs ml-[34px] whitespace-nowrap text-gray-500">
                      Top priorities
                    </p>
                  )}
                </div>

                <ul
                  role="list"
                  className="-mx-2 mt-2 space-y-1 whitespace-nowrap"
                >
                  {priorities.map((priority, index) => (
                    <li key={index}>
                      <a
                        href={priority.href}
                        className={classNames(
                          priority.current
                            ? "bg-gray-50 text-[#2f3340]"
                            : "text-white hover:text-[#2f3340] hover:bg-gray-50",
                          "group flex gap-x-3 rounded-md p-2 text-[15px] leading-6 font-semibold"
                        )}
                      >
                        <span
                          className={classNames(
                            priority.current
                              ? "text-indigo-600 border-indigo-600"
                              : "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600",
                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                          )}
                        >
                          {priority.initial}
                        </span>
                        {priority.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
});
