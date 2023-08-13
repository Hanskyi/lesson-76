import express from "express";
import {IPosts} from "../type";
import fileDb from "../fileDb";

const chatRouter = express.Router();

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

chatRouter.get('/message/get', async (req, res) => {
    const messages = await fileDb.getItems()
    res.send(messages)
})

export default chatRouter;