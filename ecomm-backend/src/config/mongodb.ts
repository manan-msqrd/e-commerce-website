import mongoose from "mongoose";

const connectToDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log('Connected to DB')
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)
}

export default connectToDB