export interface IPhoto {
    id?: string;
    title: string;
    description: string;
    imageUrl: string;
    author: string;
    likes: number;
    category: Array<string>;
    likedBy: Array<string>;
}