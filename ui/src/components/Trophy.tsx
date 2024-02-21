import { TrophyIcon } from "@heroicons/react/24/outline";
import { TodoList } from "../App";

export default function Trophy({todoStatus}: {todoStatus: string}) {
  return (
    <div>
      {todoStatus === "active" ? (
        <TrophyIcon className="h-7 w-7 hover:trophy-completed p-1" />
      ) : todoStatus === "completed" ? (
        
        <TrophyIcon className="h-7 w-7 rounded-full bg-blue-500 p-1 hover:cursor-pointer trophy-completed" />
      ) : null }
    </div>
  );
}
