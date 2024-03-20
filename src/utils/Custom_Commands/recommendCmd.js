import { EmbedBuilder } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

import connectToDatabase from '../CRUD/Create/connectToDatabase.js';
import meanPreferencePipeline from '../CRUD/Read/aggregation_pipeline/meanPreferencePipeline.js';

// "/recommend" Command to recommend the movie with the highest mean preference value
export default async function recommendCmd(interaction, serverId) {
    try {
        const dbClient = await connectToDatabase();

        const meanpipeline = meanPreferencePipeline();
        console.log(meanpipeline);

        const result = await dbClient.db("test").collection(serverId).aggregate(meanpipeline).toArray();

        if (result.length > 0) {
            // Select a random movie from the top-rated ones
            const randomIndex = Math.floor(Math.random() * result.length);
            const recommendedMovie = result[randomIndex]._id;
            const userId = result[randomIndex].users[0]; 
            const meanPreference = result[randomIndex].meanPref;

            const embed = new EmbedBuilder()
                .setTitle('Movie Recommendation')
                .setDescription(`Among all the top-rated movies, the lucky pick is from <@${userId}>:`)
                .addFields(
                    { name: 'Movie', value: recommendedMovie, inline: true },
                    { name: 'Preference Value', value: String(meanPreference), inline: true }
                )
                .setColor('#0099ff')
                .setTimestamp();

            interaction.reply({ embeds: [embed] });
        } else {
            interaction.reply('No movies found to recommend.');
        }
    } catch (error) {
        console.log('Error recommending a movie:', error);
        interaction.reply('There was an error while recommending a movie. Please try again later.');
    }
}