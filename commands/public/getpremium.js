const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
    cooldown: 15,
    data: new SlashCommandBuilder()
        .setName('getpremium ')
        .setDescription('to get premium you should boost the server'),
    async execute(interaction, client) {

           
    
 }
};