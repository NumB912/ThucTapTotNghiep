export interface Region{
    id:number;
    region:Point[],
    x:number;
    y:number;
    region_name:number;
    parent?:Region;
}

interface Point{
    x:number,
    y:number,
}