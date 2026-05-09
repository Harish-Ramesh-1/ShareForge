import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import auth from './Middlewares/authMiddleware.js';
import authRoutes from './Routes/authRoute.js';
import { codeGen , recieveCode , codeGen2 } from './Controllers/shareappController.js';
import upload from './Middlewares/multer.js';

const app=express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))


app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static('uploads'))
app.use('/auth',authRoutes);
app.post('/app/codegen',auth,codeGen);
app.post('/app/getdata',auth, recieveCode);
app.post('/app/codegen2',upload.single('file'), codeGen2);


export default app;