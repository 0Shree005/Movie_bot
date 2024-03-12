require('dotenv').config();

const { Client, IntentsBitField } = require('discord.js')

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

    if (interaction.commandName === 'add'){
        const num1 = interaction.options.get('first_number')?.value;
        const num2 = interaction.options.get('second_number')?.value;
        
        interaction.reply(`The Sum of the numbers is ${num1 + num2}`);  
    }



})

client.login(process.env.Discord_token)