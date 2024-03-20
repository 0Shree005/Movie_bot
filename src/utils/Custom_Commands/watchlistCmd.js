import dotenv from 'dotenv';
import { EmbedBuilder } from "discord.js";
import connectToDatabase from '../CRUD/Create/connectToDatabase.js';
import getSortedWatchlist from '../CRUD/Read/aggregation_pipeline/getSortedWatchlist.js';

dotenv.config();

export default async function watchlistCmd(interaction, serverId, userId) {
    try {
        const dbClient = await connectToDatabase();
        const watchlist = await getSortedWatchlist(dbClient, serverId, userId);

        const embed = new EmbedBuilder()
            .setColor('Random') 
            .setTitle('Your Watchlist')
            .setTimestamp();

        if (watchlist && watchlist.length > 0) {
            const watchlistItems = watchlist.slice(0, 25).map((movie, index) => {
                return { name: `${index + 1}. ${movie.movie_name}`, value: `Preference: *${movie.pref_val}*`, inline: false };
            });

            embed.addFields(...watchlistItems);
        } else {
            embed.setDescription('Your watchlist is empty.');
        }

        await interaction.reply({ content: `<@${userId}>`, embeds: [embed], ephemeral: true  });
    } catch (error) {
        console.log('Error fetching the watchlist:', error);
        interaction.reply('There was an error while fetching your watchlist. Please try again later.');
    }
}