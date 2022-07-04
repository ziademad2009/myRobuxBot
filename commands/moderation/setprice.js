const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const nbx = require('noblox.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('setprice')
        .setDescription('set price for robux')
        .addNumberOption(option => option.setName('amount').setDescription('Enter a amount').setRequired(true)),


        
    async execute(interaction, client) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({content: client.generalReplys.noPermissions('ADMINISTRATOR'), ephemeral: true});


        const replys = client.cmdReplys;
        await client.database.servers.setGuild(interaction.guild.id);
        const data = await client.database.servers.findOne({guildId: interaction.guild.id});
        const number = interaction.options.getNumber('amount');
        data.price = number;
        data.save();
       interaction.reply({content: replys.done(number)})
        



 
 
     
    }

}