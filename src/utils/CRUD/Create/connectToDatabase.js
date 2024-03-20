import { MongoClient }  from 'mongodb';


// Database connection function
export default async function connectToDatabase() {
    const uri = process.env.DATABASE_URI;
    const Mongoclient = new MongoClient(uri);
    try {
        await Mongoclient.connect();
        console.log('Connected to the database');
        return Mongoclient;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error; 
    }
}