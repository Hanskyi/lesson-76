import express from "express";
import {IPosts} from "../type";
import fileDb from "../fileDb";

const chatRouter = express.Router();

chatRouter.get('/message', async (req, res) => {
    let messages = await fileDb.getItems();

    if (req.query.datetime) {
        const queryDate = req.query.datetime as string;
        const date = new Date(queryDate);

        if (isNaN(date.getDate())) {
            return res.status(400).send({"error": "Invalid datetime"});
        }

        const filterDateTime = messages.filter(message => {
            const messageDate = (new Date(message.datetime)).getDate();
            return messageDate > date.getDate();
        });
        res.send(filterDateTime);
    } else {
        res.send(messages);
    }
})

chatRouter.post('/message/add', async (req, res) => {
    const newPost: IPosts = {
        author: req.body.author,
        message: req.body.message,
    };

    if (newPost.message !== '' && newPost.author !== '') {
        const savedMessage = await fileDb.addItem(newPost);
        res.send(savedMessage);
    } else {
        res.status(400).send({"error": "Author and message must be present in the request"});
    }
});


export default chatRouter;