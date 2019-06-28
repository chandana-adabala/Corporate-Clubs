export default interface IClubs{
    clubID:number,
    clubTitle:string,
    profilePic:string,
    clubCreatedBy:string,
    clubType:string,
    clubDeactiveBy:number,
    reason:string,
    createdOn:Date,
    description:string,
    rowCreatedOn:Date,
    rowCreatedBy:number,
    rowDeletedBy:number,

}

export const DefaultClub:IClubs=
{
    clubID:0,
    clubTitle:'',
    profilePic:'',
    clubCreatedBy:'',
    clubType:'',
    clubDeactiveBy:0,
    reason:'',
    createdOn:new Date(),
    description:'',
    rowCreatedOn:new Date(),
    rowCreatedBy:0,
    rowDeletedBy:0
}