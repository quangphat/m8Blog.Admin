export interface IAuthor {
    id: string,
    firstName: string,
    lastName: string,
    avatar: string,
    createdTime?: Date,
    modifiedTime?: Date,
    email: string,
    projectId: number,
    displayName: string,
    profileName: string
}