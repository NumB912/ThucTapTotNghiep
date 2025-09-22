
import type { Question } from "./question";
import type { User } from "./user";
export interface Result {
  id: string;
  user: User;
  score: number;
  submitted_at: Date;
  start_at: Date;
  end_at: Date;
  duration: number;
  ispass:boolean;
  question_quantity:number;
  status: "progressing" | "complete" | "cancel";
  questions: Question[];
}
