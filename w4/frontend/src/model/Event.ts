import type { EventDetail } from "./EventDetail";
import type { Location } from "./Location"

export interface Event{
  id:number;
  title:string,
  content:string,
  start_day:Date,
  end_day?:Date,
  location?:Location,
  details?:EventDetail[];
  image_url:string;
}
