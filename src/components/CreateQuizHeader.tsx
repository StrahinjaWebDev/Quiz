import React from "react";
import Input from "./Input";

interface Props {
  setName: (event: string) => void;
  setTime: (event: string) => void;
  setCategory: (event: string) => void;
  setDescription: (event: string) => void;
}

const CreateQuizHeader = ({ setName, setTime, setCategory, setDescription }: Props) => {
  return (
    <div className="flex flex-col ml-12 mt-8 gap-4">
      <p>General Information</p>
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
