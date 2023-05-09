import React from "react";

interface Props {
  activeBoard: string;
  setActiveBoard: (active: string) => void;
}

const BoardSelection = ({ activeBoard, setActiveBoard }: Props) => {
  return (
    <div className="flex justify-evenly items-center desktop:mb-12">
      <button
        className={`text-white  bg-secondary  hover:opacity-90 text-sm tablet:text-xl py-2 px-2 desktop:w-[7em] rounded-[60px] ${
          activeBoard === "Create" ? "text-main" : "text-white" //? Sto ne radi?
        }`}
        onClick={() => setActiveBoard("Create")}
      >
        Create quiz
      </button>
      <button
        style={{ color: activeBoard === "Edit" ? "#155263" : "white" }} //TODO: conditional classNames
        className="text-white  bg-secondary  hover:opacity-90 text-sm tablet:text-xl py-2 px-2 desktop:w-[7em]  rounded-[60px]"
        onClick={() => setActiveBoard("Edit")}
      >
        Edit Users
      </button>
    </div>
  );
};

export default BoardSelection;
