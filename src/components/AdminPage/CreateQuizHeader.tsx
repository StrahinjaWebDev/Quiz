import React from "react";
import Input from "../ReusableComponents/Input";

interface Props {
  // eslint-disable-next-line no-unused-vars
  setName: (event: string) => void;
  // eslint-disable-next-line no-unused-vars
  setTime: (event: number) => void;
  // eslint-disable-next-line no-unused-vars
  setCategory: (event: string) => void;
  // eslint-disable-next-line no-unused-vars
  setDescription: (event: string) => void;
  // eslint-disable-next-line no-unused-vars
  setCreateQuizModal: (isOpen: boolean) => void;
}

const CreateQuizHeader = ({ setName, setTime, setCategory, setDescription, setCreateQuizModal }: Props) => {
  return (
    <div className="flex flex-col ml-12 mt-8 gap-4">
      <div className="flex justify-between">
        <p className="text-4xl text-main font-medium">General Information</p>
        <button className="text-4xl text-red-500 mr-3 mb-4 font-bold" onClick={() => setCreateQuizModal(false)}>
          X
        </button>
      </div>
      <Input primary placeholder="Quiz name..." onChange={(event) => setName(event.target.value)} />
      <Input primary placeholder="Quiz time..." onChange={(event) => setTime(event.target.value)} />
      <Input primary placeholder="Quiz category..." onChange={(event) => setCategory(event.target.value)} />
      <textarea
        className="block p-2.5 w-2/3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Quiz description..."
        onChange={(event) => setDescription(event.target.value)}
      ></textarea>
    </div>
  );
};

export default CreateQuizHeader;
