export interface User {
    id: number;
    username: string;
    name:string;
    email:string;
    imageSrc:string;
    token?: string;
    expiresIn?:number;
}