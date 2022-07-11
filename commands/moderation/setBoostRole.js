const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
    cooldown: 15,
    data: new SlashCommandBuilder()
        .setName('setboostrole ')
        .setDescription('server boost role'),
    async execute(interaction, client) {
      
        
 }
};