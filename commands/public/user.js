const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const noblox = require('noblox.js');
const pendingData = require('../../src/models/pendingUsers')


module.exports = {
    cooldown: 15,
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('get user')
        .addStringOption(option => option.setName('username').setDescription('Enter a username').setRequired(true)),
    async execute(interaction, client) {
      
        const username = interaction.options.getString('username');
         const user = await noblox.getIdFromUsername(username);
        if (!user) return interaction.reply({content: '> **i cant find this user in roblox**', ephemeral: true})
    
 }
};