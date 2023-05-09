export interface Question {
  id: string;
  quizId: string;
  type: string;
  text: string;
  hint: string;
  answers: [];
  questions: {
    id: string;
    hint: string;
    quizId: string;
    text: string;
    type: string;
    answers: { id: string; correct: boolean; questionId: string; text: string }[];
  }[];
  data: {
    id: string;
    quizId: string;
    type: string;
    text: string;
    hint: string;
    answers: [];
    questions: {
      id: string;
      hint: string;
      quizId: string;
      text: string;
      type: string;
      answers: { id: string; correct: boolean; questionId: string; text: string }[];
    }[];
  };
  success: boolean;
}
