import { useContext, useState } from "react";
import CreateList from "./components/CreateList";
import Lists from "./components/Lists";
import SideBar from "./components/SideBar";
import { StateContext, StateContextType, StateProvider } from "./State";
import Bot from "./components/BotComponent";
export interface TodoItem {
  id: string;
  priority: string;
  content: string;
  description: string;
  completed: boolean;
}

export interface TodoList {
  id: string;
  createdAt: Date;
  date: string;
  title: string;
  todos: TodoItem[];
  status: string;
}

export interface ExpansionProps {
  handleExpand: () => void;
  isExpanded: React.SetStateAction<boolean>;
}

function App() {
  const [isListExpanded, setIsListExpanded] = useState<boolean>(false);
  const [isBotExpanded, setIsBotExpanded] = useState<boolean>(false);
  const {botOpen, setBotOpen} = useContext<StateContextType>(StateContext);
  const handleListExpand = () => {
    setIsListExpanded(!isListExpanded);
  };

  const handleBotExpand = () => {
    setIsBotExpanded(!isBotExpanded);
    setBotOpen(!botOpen)
  };

  return (
    <StateProvider>
      <div className="flex h-screen w-screen overflow-hidden">
        <SideBar />
        <div
          className={`absolute bottom-0 left-0 right-0 mx-auto rounded-[55px]  m-7 transition-all duration-700 border ease-in-out  overflow-x-hidden ${
            isBotExpanded ? "w-[65rem] max-h-[45rem] bg-gray-900 " : "w-14 max-h-14 bg-gray-900"
          }`}
        >
          <div>
          <Bot handleExpand={handleBotExpand} isExpanded={isBotExpanded} />
          </div>
        </div>
        <div className="flex overflow-y-scroll items-startborder-r border-gray-500 pr-9">
          <Lists />
        </div>
        <div
          className={` flex flex-none items-start transition-all border-l border-gray-500 duration-700 ease-in-out overflow-x-hidden ${
            isListExpanded
              ? "w-1/2 h-screen justify-center px-4 "
              : "justify-end h-screen mt-2 ml-1 w-14 mr-1"
          }`}
        >
          <CreateList
            handleExpand={handleListExpand}
            isExpanded={isListExpanded}
          />
        </div>
      </div>
    </StateProvider>
  );
}

export default App;
