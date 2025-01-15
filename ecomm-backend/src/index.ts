import express from 'express';
import 'dotenv/config';
import cors from 'cors'
import connectToDB from './config/mongodb';
import connectToCloudinary from './config/cloudinary';
import userRouter from './routes/userRoute';
import productRouter from './routes/productRoute';
import cartRouter from './routes/cartRoute';
import orderRouter from './routes/orderRoute';

const app = express();
const PORT = process.env.PORT || 3000;
connectToDB()
connectToCloudinary()

app.use(cors())
app.use(express.json())

//api endpoints
app.use('/api/user', userRouter)
app.use('/api/products', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
  res.send('Hello, TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
