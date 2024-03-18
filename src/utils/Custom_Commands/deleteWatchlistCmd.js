import connectToDatabase from '../CRUD/CreateOrUpdate/connectToDatabase.js';
import delete_Entire_WatchList from '../CRUD/delete/delete_Entire_WatchList.js'

export default async function deleteWatchlistCmd(interaction, userId) {
    try {
        const dbClient = await connectToDatabase();
        const replyMessage = await delete_Entire_WatchList (dbClient, userId);
        console.log(replyMessage)
        interaction.reply(replyMessage);
    } catch (error) {
        console.log('Error adding movie:', error);
        interaction.reply('There was an error while adding the movie. Please try again later.');
    }
}