const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
    cooldown: 15,
    data: new SlashCommandBuilder()
        .setName('tax')
        .setDescription('know robux price')
        .addNumberOption(option => option.setName('robux').setDescription('Enter a robux').setRequired(true)),
    async execute(interaction, client) {
     const sdb =  client.database.servers;
     const data = awai
    
 }
};