import connectToDatabase from '../CRUD/CreateOrUpdate/connectToDatabase.js';
import upsertMovieByName from '../CRUD/CreateOrUpdate/upsertUserWatchlist.js'

export default async function addCmd(interaction, userId, userMovieName, userMoviePref) {
    try {
        const dbClient = await connectToDatabase();
        const replyMessage = await upsertMovieByName(dbClient, userId, userMovieName, userMoviePref);
        interaction.reply(replyMessage);
    } catch (error) {
        console.log('Error adding movie:', error);
        interaction.reply('There was an error while adding the movie. Please try again later.');
    }
}