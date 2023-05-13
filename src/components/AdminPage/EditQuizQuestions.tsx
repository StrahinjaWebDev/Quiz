import React, { useState } from "react";
import Button from "../ReusableComponents/Button";
import Input from "../ReusableComponents/Input";
import { Question } from "../../models/Question";

interface Props {
  quizQuestions: Question[];
}

const EditQuizQuestions = ({ quizQuestions }: Props) => {
  const [question, setQuestion] = useState("");

  console.log(question);

  return (
    <div>
      {quizQuestions &&
        quizQuestions.map((question: Question) => (
          <div key={question.id} className="flex flex-row gap-3 ">
            <div className="flex flex-col   border-white border-2">
              <p>{question.text}</p>
              <div className="flex justify-between">
                <Input primary onChange={(event) => setQuestion(event.target.value)} />
                <Button primary label="Change" />
              </div>
              <p>{question.type}</p>
              <div className="flex  justify-between">
                <Input primary />
                <Button primary label="Change" />
              </div>
              <p>{question.hint}</p>
              <div className="flex gap-3 justify-between">
                <Input primary />
                <Button primary label="Change" />
              </div>
              <p>
                {question.answers.map((answer, index) => (
                  <span key={index}>{answer.text}</span>
                ))}
              </p>
              <div className="flex gap-3 justify-between">
                <Input primary />
                <Button primary label="Change" />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default EditQuizQuestions;
