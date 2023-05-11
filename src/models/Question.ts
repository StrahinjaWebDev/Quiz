import { Answers } from "./Answers";

export interface Question {
  id?: string;
  quizId?: string;
  type: string;
  text: string;
  hint: string;
  answers: Answers[];
}
