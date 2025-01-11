import mongoose from 'mongoose';

const connectDB=async()=>{
    try {    
        const connect = await mongoose.connect(process.env.MONGODB)
        .then(() => console.log('Connected!'));
    } catch (error) {
        console.log("Error conneecting database");
    }
}

export default connectDB;