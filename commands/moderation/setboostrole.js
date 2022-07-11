const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
    cooldown: 15,
    data: new SlashCommandBuilder()
        .setName('setboostrole')
        .setDescription('server boost role')
        .addRoleOption(option => option.setName('boostrole').setDescription('Select boost role').setRequired(true)),
    async execute(interaction, client) {
       if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({content: client.generalReplys.noPermissions('ADMINISTRATOR'), ephemeral: true});
       const replys = client.cmdReplys;
       const role = interaction.options.getRole('boostrole');
       const db = client.database.servers;
       await db.setGuild(interaction.guild.id);
       const data = await db.findOne({guildId: interaction.guild.id});
       data.boostRole = role.id;
       data.save();
       interaction.reply({content: replys.done(role.id)})
        
 }
};