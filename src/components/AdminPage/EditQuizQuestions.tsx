import React, { useState } from "react";
import Button from "../ReusableComponents/Button";
import Input from "../ReusableComponents/Input";
import { Question } from "../../models/Question";

interface Props {
  quizQuestions: Question[];
}

const EditQuizQuestions = ({ quizQuestions }: Props) => {
  const [question, setQuestion] = useState("");

  return (
    <div>
      {quizQuestions &&
        quizQuestions.map((question: Question) => (
          <div key={question.id} className="flex flex-col gap-3 pt-10 ">
            <div className="flex items-start flex-col pl-3">
              <label htmlFor="name">Qustion name</label>
              <Input id="name" defaultValue={question.text} primary />
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-end gap-3">
                <div className="flex flex-col items-start gap-1">
                  <label htmlFor="type">Question type</label>
                  <Input id="type" defaultValue={question.type} primary onChange={(event) => setQuestion(event.target.value)} />
                </div>
                <Button primary label="Change" />
              </div>

              <div className="flex items-end gap-3">
                <div className="flex flex-col items-start gap-1">
                  <label htmlFor="hint">Question hint</label>
                  <Input id="hint" defaultValue={question.hint} primary />
                </div>
                <Button primary label="Change" />
              </div>

              <div className="flex items-center gap-3">
                <Input primary />
                <Button primary label="Change" />
              </div>
            </div>
            <div>
              <div className="flex flex-col ml-10 gap-3">
                <p className="font-semibold text-main">Answers</p>
                {question.answers.map((answer) => (
                  <div className="flex gap-3" key={answer.id}>
                    <Input defaultValue={answer.text} primary />
                    <div className="max-w-1/2">
                      <Button primary label="Change" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default EditQuizQuestions;
