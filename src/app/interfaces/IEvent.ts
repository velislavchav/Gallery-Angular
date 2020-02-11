export interface IEvent {
    id?: string;
    title: string;
    description: string;
    date: string;
    imageUrl: string;
    author: string;
    authorId: string;
    enrolls: Array<string>;
}