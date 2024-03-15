require('dotenv').config();

const { Client, IntentsBitField } = require('discord.js')
const mongoose = require('mongoose');


// Connect to Database 
mongoose.connect(process.env.DATABASE);

const movieSchema = new mongoose.Schema({
    username: String,
    movie_name: [{
        type: mongoose.Schema.Types.String,
    }],
    preference_value: [{
        type: mongoose.Schema.Types.Number,
    }],
});


const UserMovie = mongoose.model('User Movies', movieSchema);

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
        if (!(UserMovie.find(userId))){
            await UserMovie.create({ username: userId, movie_name: userMovieName, preference_value: userMoviePref});
        }
        else{
            UserMovie.updateOne(
                { username: userId },
                { $push: { movie_name: userMovieName, preference_value: userMoviePref } }
            )
        }
        await UserMovie.create({ movie_name: userMovieName, preference_value: userMoviePref});

        interaction.reply(`<@${userId}> Your movie **${userMovieName}** with Preference of **${userMoviePref}** was added to your watchlist`);
    }

    // "/watchlist"
    if (interaction.commandName === 'watchlist'){

        const userMovies = await UserMovie.find({userId})

        let styledWatchlist = "Your current watchlist:\n"
        userMovies.forEach((movie, index) => {
            styledWatchlist += `${index + 1}. **${movie.name}** (Preference: ${movie.preference})\n`            
        });
        interaction.reply(`<@${userId}> Your current watchlist ${styledWatchlist}`);
    }
})

client.login(process.env.Discord_token)