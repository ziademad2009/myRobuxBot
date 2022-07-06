const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');


module.exports = {
    cooldown: 15,
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('help command.'),
    async execute(interaction, client) {

    const replys = client.cmdReplys;
    let data = [];

    client.commandFiles.forEach(command => {
      if(!command.startsWith('help')) data.push(`\`/${command.replace('.js', '')}\``);
    });
    let embed = new MessageEmbed()
    .setTitle(`help command`)
    .setColor(client.embedColor)
    .setDescription(data.join('\n\ ').toString());
    await interaction.reply({embeds: [embed]});
    


           
    
 }
};