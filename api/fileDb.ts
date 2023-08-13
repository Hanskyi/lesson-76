import {promises as fs} from 'fs';
import {randomUUID} from "crypto";
import {IPosts, IPostsWithoutId} from "./type";


const pathName = './db.json';
let data: IPostsWithoutId[] = [];

const fileDb = {
    async init() {
        try {
            const fileContents = await fs.readFile(pathName);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            console.error(e);
            data = [];
        }
    },
    
    async getItems() {
        // if (!data){
        //
        // }
        return data;
    },
    
    async addItem(item: IPosts) {

        const date = (new Date()).toISOString();
        const id = randomUUID().toString()
        const message = {
            author: item.author,
            message: item.message,
            id: id,
            datetime: date,
        };

        data.push(message);
        await this.save();
        return message;
    },
    async save() {
        await fs.writeFile(pathName, JSON.stringify(data));
    },
}

export default fileDb;