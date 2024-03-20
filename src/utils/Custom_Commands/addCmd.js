import dotenv from 'dotenv';
dotenv.config();

import { EmbedBuilder } from "discord.js";
import connectToDatabase from '../CRUD/Create/connectToDatabase.js';
import upsertMovieByName from '../CRUD/Update/upsertUserWatchlist.js';
import createCollection from '../CRUD/Create/createCollection.js';

export default async function addCmd(interaction, serverId, userId, globalName, userMovieName, userMoviePref) {
    try {
        const dbClient = await connectToDatabase();

        // Check if the collection for the respective server exists
        const collections = await dbClient.db(process.env.DATABASE).listCollections({ name: serverId }).toArray();
        if (collections.length === 0) {
            // If the collection does not exist, create it
            await createCollection(serverId);
        }

        const replyMessage = await upsertMovieByName(dbClient, serverId, userId, userMovieName, userMoviePref);

        const embed = new EmbedBuilder () 
        .setTitle(`*${userMovieName}* Added Successfully!`)
        .setColor('Random')
        .addFields(
            { name: 'Movie Name', value: `*${userMovieName}*`, inline: true }, 
            { name: 'Preference Value', value: `*${String(userMoviePref)}*`, inline: true }, 
        )
        .setTimestamp();
    
        await interaction.reply({ content: `<@${userId}>`, embeds: [embed], ephemeral: true });

    } catch (error) {
        console.log('Error adding movie:', error);
        if (interaction.replied || interaction.deferred) {
            interaction.followUp('There was an error while adding the movie. Please try again later.');
        } else {
            interaction.reply('There was an error while adding the movie. Please try again later.');
        }
    }
} 