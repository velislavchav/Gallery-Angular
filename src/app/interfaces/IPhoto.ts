export interface IPhoto {
    id?: string;
    title: string;
    description: string;
    imageUrl: string;
    author: string;
    likes: number;
    category: string;
    likedBy: Array<string>;
}