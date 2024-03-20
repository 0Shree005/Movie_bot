import connectToDatabase from './connectToDatabase.js';

export default async function createCollection(serverId) {
    try {
        const client = await connectToDatabase();

        const db = client.db(process.env.DATABASE);

        // Create the server collection
        await db.createCollection(serverId);
    } catch (error) {
        console.error('Error creating collection:', error);
        throw error; 
    }
}