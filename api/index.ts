import express from "express";
import cors from "cors";
import fileDb from "./fileDb";
import chatRouter from "./Routers/message";

const port = 8000;
const app = express();
app.use(express.json());
app.use(cors());
app.use('/', chatRouter);

app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
});

const run  = async () => {
   await fileDb.init();
};

run().catch(error => console.log(error));