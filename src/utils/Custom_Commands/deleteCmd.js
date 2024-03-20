import connectToDatabase from '../CRUD/Create/connectToDatabase.js';

export default async function deleteCmd(interaction, userId, userMovieName) {
    try {
        const dbClient = await connectToDatabase();

        const userWatchlist = await findOneUserByName(dbClient, userId);

        if (userWatchlist && userWatchlist.movie_name && userWatchlist.pref_val) {
            const index = userWatchlist.movie_name.indexOf(userMovieName);
            if (index !== -1) {
                interaction.reply(`Successfully deleted "${userMovieName}" from your watchlist.`);
            } else {
                interaction.reply(`"${userMovieName}" is not found in your watchlist.`);
            }
        } else {
            interaction.reply('Your watchlist is empty.');
        }
    } catch (error) {
        console.log('Error deleting movie:', error);
        interaction.reply('There was an error while deleting the movie. Please try again later.');
    }
}