require('dotenv').config();

const { Client, IntentsBitField } = require('discord.js')
const mongoose = require('mongoose');


// Connect to Database 
mongoose.connect(process.env.DATABASE);

const movieSchema = new mongoose.Schema({
    movie_name: String,
    preference_value: Number
});

// Creating a model for movies
// const UserChoice = new DiscordMovies({ 
//     movie_name: userMovieName,
//     preference_value: userMoviePref
// });

const Movie = mongoose.model('Movie', movieSchema);

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
client.on("ready", (c) => {
    console.log(`${c.user.tag} is online`)
})

// Functionality of Custom Slash commands
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) 
        return;

    const userId = interaction.user.id

    
    // "/add"
    if (interaction.commandName === 'add'){
        const userMovieName = interaction.options.getString('movie_name');
        const userMoviePref = interaction.options.getNumber('preference_value');

        await Movie.create({ movie_name: userMovieName, preference_value: userMoviePref});
        // const userWatchList = watchLists.get(userId) || [] 
        // userWatchList.push({ name: userMovieName, preference: userMoviePref })

        // console.log(userWatchList)
        // watchLists.set(userId, userWatchList)
        interaction.reply(`<@${userId}> Your movie **${userMovieName}** was added to your watchlist`);
    }

    // "/watchlist"
    if (interaction.commandName === 'watchlist'){

        const userMovies = await Movie.find({})

        let styledWatchlist = "Your current watchlist:\n"
        userMovies.forEach((movie, index) => {
            styledWatchlist += `${index + 1}. **${movie.name}** (Preference: ${movie.preference})\n`            
        });
        interaction.reply(`<@${userId}> Your current watchlist ${styledWatchlist}`);
    }
})

client.login(process.env.Discord_token)