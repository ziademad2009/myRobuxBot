const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const noblox = require('noblox.js');


module.exports = {
    cooldown: 15,
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('get user'),
    async execute(interaction, client) {
      
           
    
 }
};