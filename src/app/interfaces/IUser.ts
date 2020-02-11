export interface IUser {
    uid: string;
    name: string;
    email: string;
    imageUrl?: string;
    phone: string;
    likedPhotos: Array<string>;
    enrolledEvents: Array<string>;
}