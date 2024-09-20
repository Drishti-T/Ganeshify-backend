import mongoose from 'mongoose';

const dbURI = process.env.DATABASE_URL;

//type guard check for dbURL
if (!dbURI) {
    throw new Error('DATABASE_URL is not defined in the environment variables');
}


// Function to connect to MongoDB
export const connectToDatabase = async () => {
    try {
        await mongoose.connect(dbURI);
    } catch (error) {
        throw error;  // Optional: re-throw the error if you want the app to crash on failure
    }
};

