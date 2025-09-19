import type { Topic } from "./topic";

export interface Question {
  id: number;
  title: string;
  content: string;
  audio: string;
  ansa: string;
  ansb: string;
  ansc: string;
  ansd?: string;
  mandatory: boolean;
  pos: number;
  status: string;
  topic: Topic;
}

export interface PracticeQuestion extends Question {
  ansHint: string;
  ansRight: "A" | "B" | "C" | "D";
  answer: string;
}

export interface ResultQuestion extends Question{
  ansRight: "A" | "B" | "C" | "D";
  answer: string;
}

export interface ExamQuestion extends Question {
  answer:string;
}
