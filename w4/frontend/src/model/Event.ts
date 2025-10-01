import type { EventDetail } from "./EventDetail";

export interface Event{
  id:number;
  title:string,
  content:string,
  day:Date,
  toDay?:Date,
  region_name?:string,
  details?:EventDetail[];
  region:Point[],
  img:string,
}

interface Point{
    x:number,
    y:number,
}