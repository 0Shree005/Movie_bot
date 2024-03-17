import dotenv from 'dotenv';
dotenv.config();

import { Client, IntentsBitField }  from 'discord.js';
import { MongoClient }  from 'mongodb';
import mongoose  from 'mongoose';


//importing Functions 
import findOneUserByName from './utils/findOneUserByName.js';
import connectToDatabase from './utils/connectToDatabase.js';
import createMovie from './utils/createMovie.js';
import upsertMovieByName from './utils/upsertUserWatchlist.js';


// Initialising Discord Permissions
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

// Conformation for Bot's status
client.on("ready", () => {
    console.log(`${client.user.tag} is online`)
})

// Functionality of Custom Slash commands
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) 
        return;

    const userId = interaction.user.id
    const userMovieName = interaction.options.getString('movie_name');
    const userMoviePref = interaction.options.getNumber('preference_value');
    // "/add"
    if (interaction.commandName === 'add'){
        try {
            const dbClient = await connectToDatabase();
            const replyMessage = await upsertMovieByName(dbClient, userId, userMovieName, userMoviePref);
            interaction.reply(replyMessage);
        } catch (error) {
            console.log('Error adding movie:', error);
            interaction.reply('There was an error while adding the movie. Please try again later.');
        }   
    }

    // "/watchlist"
    if (interaction.commandName === 'watchlist'){
        try {
            const dbClient = await connectToDatabase();
            const [movieNames, prefValues] = await findOneUserByName(dbClient, userId);

            if (movieNames && prefValues) {
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
})

client.login(process.env.Discord_token);