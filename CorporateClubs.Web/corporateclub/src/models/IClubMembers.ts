export default interface IClubMembers{
    clubID:number,
    userID:number,
    role:string,
    joiningDate:Date,
     isFavoriteClub:boolean,
    isPersonBlock:boolean,
    isRequested:boolean,
    isClubMute:boolean,
    lastSeen:Date,
    rowCreatedOn:Date,
    rowCreatedBy:number,
    rowDeletedBy:number
}