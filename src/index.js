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
// "/delete_Entire_WatchList"
import deleteWatchlistCmd from './utils/Custom_Commands/deleteWatchlistCmd.js';
// "/recommend"
import recommendCmd from './utils/Custom_Commands/recommendCmd.js';
// "/help"
import helpCmd from './utils/Custom_Commands/helpCmd.js';

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

    const serverId = interaction.guild.id;
    const userId = interaction.user.id
    const globalName = interaction.user.globalName;
    const userMovieName = interaction.options.getString('movie_name');
    const userMoviePref = interaction.options.getNumber('preference_value');

    // "/add"
    if (interaction.commandName === 'add'){
        await addCmd(interaction, serverId, userId, globalName, userMovieName, userMoviePref);
    }

    // "/watchlist"
    if (interaction.commandName === 'watchlist') {
        await watchlistCmd(interaction, serverId, userId);
    }

    // "/delete_Entire_WatchList"
    if (interaction.commandName === 'delete_watchlist') {
        await deleteWatchlistCmd(interaction, serverId, userId);
    }
 
    // "/recommend"
    if (interaction.commandName === 'recommend') {
        await recommendCmd(interaction, serverId);
    } 

    // "/help"
    if (interaction.commandName === 'help') {
        await helpCmd(interaction);
    } 
    
})

client.login(process.env.DISCORD_TOKEN);