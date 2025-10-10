export interface Location{
    id:number;
    region:Point[],
    x:number;
    y:number;
    Location:string;
    parent?:Location;
}

interface Point{
    x:number,
    y:number,
}