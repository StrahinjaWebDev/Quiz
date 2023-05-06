import React from "react";
import Button from "./Button";
import Input from "./Input";

const QuizzAddAndSearch = ({ searchQuizValue, handleQuizSearchInputChange }) => {
  return (
    <div className="flex flex-row gap-12 items-center ml-12">
      <Button label="Create quiz" secondary />
      <Input value={searchQuizValue} onChange={handleQuizSearchInputChange} placeholder="Search quiz.." primary />
    </div>
  );
};

export default QuizzAddAndSearch;
