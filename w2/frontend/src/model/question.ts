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
  anshint?:string,
  ansright?:string,
  ansuser?:string
}
