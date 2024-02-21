import { TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

function Confirm({
  message,
  onConfirm,
}: {
  message: string;
  onConfirm: () => void;
}) {
  const [visible, setVisible] = useState(false);

  const handleConfirm = () => {
    setVisible(false);
    onConfirm();
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <div
        onClick={() => setVisible(true)}
        className="group-hover:opacity-100 opacity-0 transition-all duration-200"
      >
        <TrashIcon className="h-4 w-4 ml-12 flex justify-center hover:scale-125 transition-all duration-500 hover:cursor-pointer items-center" />
      </div>
      {visible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-10 flex flex-col items-center w-80">
            <p className="mb-8">{message}</p>
            <button
              onClick={handleConfirm}
              className="py-2 px-4 mb-2 font-semibold rounded-lg shadow-md text-white bg-red-500 hover:bg-red-700"
            >
              Yes
            </button>
            <button
              onClick={handleCancel}
              className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-gray-500 hover:bg-gray-700"
            >
              No
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Confirm;
