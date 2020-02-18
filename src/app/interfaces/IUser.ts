export interface IUser {
    uid: string;
    name: string;
    email: string;
    profileImage: string;
    phone: string;
    likedPhotos: Array<string>;
    enrolledEvents: Array<string>;
}