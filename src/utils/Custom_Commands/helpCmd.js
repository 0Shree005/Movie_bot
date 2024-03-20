import { EmbedBuilder } from 'discord.js';

export default async function helpCmd(interaction) {
    let embed = new EmbedBuilder()
        .setColor('Random')
        .setTitle('Help Commands')
        .setTimestamp();

    let commands = [
        { 
            name: "/add [movie name] [preference value]", 
            value: "Adds a movie to your watchlist with a preference value. The preference value should be between 1 (lowest) and 10 (highest), indicating your interest level in the movie.", 
            inline: false 
        },
        { name: "/watchlist", value: "Displays all the movies in your watchlist.", inline: false },
        { name: "/recommend", value: "Recommends a movie from your watchlist based on the highest mean preference value.", inline: false },
        { name: "/delete_watchlist", value: "Deletes your entire watchlist.", inline: false },
        { name: "/help", value: "Shows a list of all available commands and their descriptions.", inline: false }
    ];
    embed.addFields(...commands);

    await interaction.reply({ embeds: [embed] });
}