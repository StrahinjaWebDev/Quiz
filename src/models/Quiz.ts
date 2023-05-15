import { Question } from "./Question";

export interface Quiz {
  id?: string;
  name?: string;
  time?: number;
  category?: string;
  active?: boolean;
  description?: string;
  questions?: Question[];
}
