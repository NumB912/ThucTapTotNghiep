
import type { ExamQuestion } from "./question";
import type { User } from "./user";
export interface Result {
  id: string;
  user: User;
  score: number;
  submittedAt: Date;
  startAt: Date;
  endAt: Date;
  duration: number;
  status: "progressing" | "complete" | "cancel";
  questions: ExamQuestion[];
}