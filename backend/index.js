import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/User.routes.js';
import claimRoutes from './routes/Claim.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000
const URI = process.env.MONGODB_URI;

//middleware
app.use(cors());
app.use(express.json());

//DB connection
try {
  mongoose.connect(URI);
  console.log("connected to mongodb")
} catch (error) {
  console.log("Mongodb connection error",error)
}

// Routes
app.use('/api/users', userRoutes);
app.use('/api/claim', claimRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
