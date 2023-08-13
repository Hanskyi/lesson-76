export interface  IPosts {
    author: string,
    message: string;
}

export interface IPostsWithoutId {
    datetime: string,
    id: string,
    author: string,
    message: string;
}