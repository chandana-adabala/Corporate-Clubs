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
    connectedUserName:string,
    userID:number,
    message:string,
    connectedUserProfilePic:string,//connected user profile pic
    userName:string,
}
// userID = msg.UserID,
// connectedUserID = msg.ConnectedUserID,
// userName = connectedUserInfo.DisplayName,
// connectedUserName = userInfo.DisplayName,
// profilePic = connectedUserInfo.ProfilePic,
// message = msg.Message,
// postedOn = msg.PostedOn,
// attachmentUrls = urls,
// attachmentNames = names