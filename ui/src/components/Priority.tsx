import React, { useEffect, useState } from "react";

/* eslint-disable no-constant-condition */
export default function Priority({
  handleUpdate,
  priority,
  setPriority,
  isInBotComponent,
}: {
  handleUpdate: () => void;
  priority: string;
  setPriority: React.Dispatch<React.SetStateAction<string>>;
  isInBotComponent: boolean;
}) {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  useEffect(() => {
    setOpenMenu(false);
  }, []);

  useEffect(() => {
    handleUpdate();
  }, [handleUpdate, priority]);

  const handlePriority = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isInBotComponent) {
      setOpenMenu(!openMenu);
    }
  };
  const width = openMenu ? "w-7 " : "w-0";

  const high = "High";
  const mid = "Mid";
  const priorities = ["High", "Mid", "Low"];
  const PriorityColor = ({ p }: { p: string }) => {
    let colorClass;
    if (p === high || p === high) {
      colorClass = "fill-red-500";
    } else if (p === mid || p === mid) {
      colorClass = "fill-yellow-500";
    } else {
      colorClass = "fill-green-500";
    }
    return (
      <svg
        viewBox="0 0 2 2"
        className={`justify-center hover:scale-125 flex items-center h-[9.5px] w-[9.5px] ${colorClass}`}
        onClick={() => setPriority(p)}
      >
        <circle cx={1} cy={1} r={1} />
      </svg>
    );
  };

  return (
    <div
      className={`  flex gap-[7px] p-2 transition-all duration-500 rounded-full ${
        openMenu ? "open-menu" : "close-menu"
      } ${openMenu && priority}`}
    >
      <button
        onClick={handlePriority}
        className={`bg-transparent flex ${width} justify-center items-center transition-all duration-500 ease-in-out gap-2 `}
      >
        {priorities
          .filter((p) => p !== priority)
          .map((pri, index) => (
            <PriorityColor p={pri} key={index} />
          ))}
      </button>
      <button onClick={handlePriority}>
        <PriorityColor p={priority} />
      </button>
    </div>
  );
}
