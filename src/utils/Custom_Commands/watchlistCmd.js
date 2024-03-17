import connectToDatabase from '../CRUD/CreateOrUpdate/connectToDatabase.js';
import findOneUserByName from '../CRUD/find/findOneUserByName.js';

// "/watchlist" Command to handle the displaying of user's current watchlist
export default async function watchlistCmd(interaction, userId) {
    try {
        const dbClient = await connectToDatabase();
        const result = await findOneUserByName(dbClient, userId);

        if (result && result[0] && result[1]) {
            const [movieNames, prefValues] = result;
            const watchlistItems = movieNames.map((movie, index) => {
                return `${index + 1}. **${movie}** - **${prefValues[index]}**`;
            });

            const watchlistMessage = watchlistItems.join('\n');
            interaction.reply(`<@${userId}> Your current watchlist {Movie - Preference}:\n${watchlistMessage}`);
        } else {
            interaction.reply(`<@${userId}> Your watchlist is empty.`);
        }
    } catch (error) {
        console.log('Error searching for the watchlist:', error);
        interaction.reply('There was an error while searching for your watchlist. Please try again later.');
    }
}