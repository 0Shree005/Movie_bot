require('dotenv').config();

const { REST, Routes, ApplicationCommandOptionType } = require('discord.js') 

const commands = [
    {
        name: 'add',
        description: 'Add a movie with its preference value',
        options: [
            {
                name: 'movie_name',
                description: 'Add Movie name',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'preference_value',
                description: 'Add movie`s preference value from 1-10',
                type: ApplicationCommandOptionType.Number,
                required: true,
            },
        ]
    },
    {
        name: 'watchlist',
        description: 'Shows your current watchlist',
    },
]

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
(async () => {
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            {body: commands}
        )

        console.log('Slash commands were registerd succesfully!');

    } catch (error) {
        console.log(`There was an error: ${error}`);
    }
}) ();
