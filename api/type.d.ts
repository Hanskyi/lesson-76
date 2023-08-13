export interface  IPosts {
    author: string,
    message: string;
}

export interface IPostsWithoutId {
    dateTime: string,
    id: string,
    author: string,
    message: string;
}