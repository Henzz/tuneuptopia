import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import User from './routes/User.js';
import cors from 'cors';

const app = express();

// Middleware
// Parse Body
app.use(express.json());

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

app.use('/api/v1/users', User);

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
