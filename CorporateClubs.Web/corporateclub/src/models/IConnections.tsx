export default interface IConnections
{
      userID?:number, // Existing user id
      connectedUserID?:number // Existing user id
      connectedDate?:Date //2-11-2019 12:00:02AM
      isFavourite?:boolean // 1 or 0
      isBlock?:boolean // 1 or 0
      isRequested?:boolean // 1 or 0
      isMute?:boolean // 1 or 0
      profilePic?:string //..
      email?:string //abc@outlook.com
      mobileNumber?:string //+917988967890
      mutualClubs?:number  //number
      mutualFriends?:number //number
      displayName?:string //giraffi_2
      about?:string//about hero
      role?:string
      isActive?:boolean
}

export const DefaultConnections:IConnections=
{
      userID:0,
      connectedUserID:0, 
      connectedDate:new Date(), 
      isFavourite:false,
      isBlock:false ,
      isRequested:false,
      isMute:false ,
      profilePic:'',
      email:'',
      mobileNumber:'',
      mutualClubs:0 ,
      mutualFriends:0, 
      displayName:'', 
      about:'',
      role:'',
      isActive:false

}