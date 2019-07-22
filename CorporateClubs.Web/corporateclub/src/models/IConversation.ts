export default interface IConversation{
    postedOn:number,
    clubID:number,
    userID:number,
    message:string,
    profilePic:string,
    userName:string,
    // attachmentUrls:string,
    // attachmentNames:string

}

export interface IPrivateConversation{
    postedOn:number,
    connectedUserID:number,
    userID:number,
    message:string,
    profilePic:string,
    userName:string,
}