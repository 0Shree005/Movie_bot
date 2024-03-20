import { EmbedBuilder } from "discord.js";
import dotenv from 'dotenv';
dotenv.config();

import connectToDatabase from '../CRUD/Create/connectToDatabase.js';
import delete_Entire_WatchList from '../CRUD/delete/delete_Entire_WatchList.js'

export default async function deleteWatchlistCmd(interaction, serverId, userId) {
    try {
        const dbClient = await connectToDatabase();
        const replyMessage = await delete_Entire_WatchList (dbClient, serverId, userId);
        console.log(replyMessage)

        const embed = new EmbedBuilder()
            .setTitle('Watchlist Deleted')
            .setDescription(replyMessage)
            .setColor('Random')
            .setTimestamp();

        interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
        console.log('Error deleting watchlist:', error);
        interaction.reply({ content: 'There was an error while deleting the watchlist. Please try again later.', ephemeral: true });
    }
}