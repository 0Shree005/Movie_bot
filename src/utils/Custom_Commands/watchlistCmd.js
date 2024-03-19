import connectToDatabase from '../CRUD/CreateOrUpdate/connectToDatabase.js';
import getSortedWatchlist from '../CRUD/Read/getSortedWatchlist.js';

// "/watchlist" Command to handle the displaying of user's current watchlist
export default async function watchlistCmd(interaction, userId) {
    try {
        const dbClient = await connectToDatabase();
        const watchlist = await getSortedWatchlist(dbClient, userId);

        if (watchlist && watchlist.length > 0) {
            const watchlistItems = watchlist.map((movie, index) => {
                return `${index + 1}. **${movie.movie_name}** - **${movie.pref_val}**`;
            });

            const watchlistMessage = watchlistItems.join('\n');
            interaction.reply(`<@${userId}> Your current watchlist {Movie - Preference}:\n${watchlistMessage}`);
        } else {
            interaction.reply(`<@${userId}> Your watchlist is empty.`);
        }
    } catch (error) {
        console.log('Error fetching the watchlist:', error);
        interaction.reply('There was an error while fetching your watchlist. Please try again later.');
    }
}