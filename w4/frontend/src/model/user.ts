export interface User{
    id:number,
    userName:string,
    password:string,
    email:string,
    createAt:Date,
    UpdateAt:Date,
    img?:string;
    name:string;
    favorites?:Event[]
}