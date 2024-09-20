import dotenv from 'dotenv';
dotenv.config();
import express  from 'express';
import userRoute from './routes/user';
import { connectToDatabase } from './config/dbConfig';
import cors from 'cors';



const app = express();
app.use('/*', cors());
app.use(express.json());
connectToDatabase();
app.use("/api/v1/user", userRoute);


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`)
})

