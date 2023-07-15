import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { identifyUser } from './src/controllers/user-controller';
import bodyParser from 'body-parser';

// import { validateRequestBody } from './src/dto/identity-user-dto';

dotenv.config();

const app: Express = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS
const port = process.env.PORT || 3000;

// Define the /identify endpoint
app.post('/identify', async (req: Request, res: Response) => {
    if (!req.body.email && !req.body.phoneNumber) {
        return res.status(400).json({ errors: 'one of these is required - email or phoneNumber' });
    }

    return await identifyUser(req, res);
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});