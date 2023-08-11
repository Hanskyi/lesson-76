import express from "express";
import {IPosts} from "../type";


const chatRouter = express.Router();

chatRouter.post('/add', async (req, res) => {
    const newPost: IPosts = {
        author: req.body.author,
        datetime: req.body.datetime,
        message: req.body.message,
    }

});

export default chatRouter;