import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import userRouter from './routes/User.js';
import newsRouter from './routes/News.js';

const app = express();
const upload = multer(); // Configure multer for in-memory storage

// Middleware
// Parse Body
app.use(express.json());

// Middleware to handle multipart/form-data
app.use(upload.none()); // Use .none() if you're not uploading files

// Handling CORS Policy
// Option 1: Allow all Origins with Default of cors(*)
app.use(cors());
// Option 1: Allow all Origins with Default of cors(*)
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

// Routes
app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('Welcome Welcome!!');
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/news', newsRouter);

// Server
app.listen(PORT, () => {
  console.log(`Sucess: Server is running on port http://localhost:${PORT}`);
});

mongoose
  .connect(mongoDBURL)
  .then((res) => {
    console.log(`Success: App connected to database `);
  })
  .catch((err) => {
    console.log(`Error: App not connected to database`);
  });
