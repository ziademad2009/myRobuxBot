const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const nbx = require('noblox.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('setproofchannel')
        .setDescription('set proof channel')
        .addChannelOption(option => option.setName('proochannel').setDescription('select  proof channel').setRequired(true)),

        
    async execute(interaction, client) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({content: client.generalReplys.noPermissions('ADMINISTRATOR'), ephemeral: true});


        const replys = client.cmdReplys;
        await client.database.servers.setGuild(interaction.guild.id);
        const data = await client.database.servers.findOne({guildId: interaction.guild.id});
        const proochannel = interaction.options.getChannel('proochannel');
        data.proofchannel = proochannel.id;
        data.save();
        interaction.reply({content: replys.done(proochannel.id)});



 
 
     
    }

}