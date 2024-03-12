require('dotenv').config();

const { Client, IntentsBitField, moveElementInArray } = require('discord.js')

// const arr= [];
const watchLists = new Map()

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})


client.on("ready", (c) => {
    console.log(`${c.user.tag} is online`)
})

client.on('interactionCreate', (interaction) => {


    if (!interaction.isChatInputCommand()) 
        return;

    const userId = interaction.user.id


    if (interaction.commandName === 'add'){
        const userMovieName = interaction.options.getString('movie_name');
        const userMoviePref = interaction.options.getNumber('preference_value');
        console.log(interaction.options)
        const userWatchList = watchLists.get(userId) || [] 
        userWatchList.push({ name: userMovieName, preference: userMoviePref })
        // console.log(userMovieName)
        watchLists.set(userId, userWatchList)
        interaction.reply(`<@${userId}> Your movie **${userMovieName}** was added to your watchlist`);
    }
    if (interaction.commandName === 'watchlist'){
        const userWatchList = watchLists.get(userId) || [];

        let styledWatchlist = "Your current watchlist:\n"
        userWatchList.forEach((movie, index) => {
            styledWatchlist += `${index + 1}. **${movie.name}** (Preference: ${movie.preference})\n`            
        });
        interaction.reply(`<@${userId}> Your current watchlist ${styledWatchlist}`);
    }
})

client.login(process.env.Discord_token)