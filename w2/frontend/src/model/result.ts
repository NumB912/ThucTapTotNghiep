
import type { ExamQuestion, ResultQuestion } from "./question";
import type { User } from "./user";
export interface Result {
  id: string;
  user: User;
  score: number;
  wrong:number;
  submittedAt: string;
  startAt: string;
  endAt: string;
  duration: number;
  isPass:boolean;
  questionQuantity:number;
  status: "progressing" | "complete" | "cancel";
  questions: ExamQuestion[];
}

export interface ResultAnwser{
    id: string;
  user: User;
  score: number;
  wrong:number;
  submittedAt: string;
  startAt: string;
  endAt: string;
  duration: number;
  isPass:boolean;
  questionQuantity:number;
  status: "progressing" | "complete" | "cancel";
  questions:ResultQuestion[];
}
