import type { EventDetail } from "./EventDetail";
import type { Image } from "./Image";
import type { Region } from "./Region"

export interface Event{
  id:number;
  title:string,
  content:string,
  start_day:Date,
  end_day?:Date,
  region?:Region,
  details?:EventDetail[];
  image:Image;
}
