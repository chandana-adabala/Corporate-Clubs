

 export default interface INewClub
    {
        clubType?:string
        description?:string
        profilePic?:string|null
        members?:number[]
        admins?:number[]
        clubTitle?:string;
        clubID?:number
    }