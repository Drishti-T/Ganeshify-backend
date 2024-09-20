import express, { Request, Response } from 'express';
import { submitForm } from '../controllers/emailController';

export const userRoute = express.Router();

userRoute.get("/", async (req: Request, res: Response) => {
    res.send("hello from ganeshify");
});

userRoute.post("/form", submitForm);


export default userRoute;






