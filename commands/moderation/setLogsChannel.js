const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const nbx = require('noblox.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('setlogschannel')
        .setDescription('set logs channel')
        .addChannelOption(option => option.setName('logschannel').setDescription('select  logs channel').setRequired(true)),

        
    async execute(interaction, client) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({content: client.generalReplys.noPermissions('ADMINISTRATOR'), ephemeral: true});


        const replys = client.cmdReplys;
        await client.database.servers.setGuild(interaction.guild.id);
        const data = await client.database.servers.findOne({guildId: interaction.guild.id});  
        const logschannel = interaction.options.getChannel('logschannel');
        data.logsChannel = logschannel.id
        data.save();
        interaction.reply({content: replys.done(logschannel.id)});



 
 
     
    }

}