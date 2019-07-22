export default interface IMsgWithAttach{
     ClubID:number,
    UserID:number,
    Message:string,
    ProfilePic:string,
    UserName:string

}

export interface IPrivateMsgWithAttach{
    ConnectedUserID:number,
    UserID:number,
    Message:string,
    ProfilePic:string,
    UserName:string
}