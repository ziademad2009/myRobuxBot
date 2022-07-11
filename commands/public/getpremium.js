const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
    cooldown: 15,
    data: new SlashCommandBuilder()
        .setName('getpremium ')
        .setDescription('to get premium you should boost the server'),
    async execute(interaction, client) {
     const replys = client.cmdReplys;
     const sdb = client.database.servers;
     const db = client.database.users;
     await db.setUser(interaction.user.id);
     
     const data = await sdb.findOne({guildId: interaction.guild.id});
     const data2 = await db.findOne({userId: interaction.user.id});
     const boostRole = data.boostRole;
     if (!interaction.member.roles.cache.has(boostRole)) return interaction.reply({content: replys.boostFirst});
    
 }
};