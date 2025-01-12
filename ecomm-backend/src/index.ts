import express from 'express';
import 'dotenv/config';
import cors from 'cors'
import connectToDB from './config/mongodb';
import connectToCloudinary from './config/cloudinary';

const app = express();
const PORT = process.env.PORT || 3000;
connectToDB()
connectToCloudinary

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
  res.send('Hello, TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
