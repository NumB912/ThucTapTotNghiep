export interface Topic{
    id:number,
    title:string,
    description:string,
    featureImg:string,
    parent:number,
    pos:number,
    status:"active"|"inactive"
}