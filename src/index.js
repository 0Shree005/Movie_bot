import dotenv from 'dotenv';
dotenv.config();

import { Client, IntentsBitField }  from 'discord.js';

/**
 * importing custom slash commands
 */
// "/add"
import addCmd from './utils/Custom_Commands/addCmd.js';
// "/watchlist"
import watchlistCmd from './utils/Custom_Commands/watchlistCmd.js';

/**
 * Initialising Discord Permissions
 */ 
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
        await addCmd(interaction, userId, userMovieName, userMoviePref);
    }

    // "/watchlist"
    if (interaction.commandName === 'watchlist') {
        await watchlistCmd(interaction, userId);
    }
})

client.login(process.env.Discord_token);