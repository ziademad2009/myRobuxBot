const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const nbx = require('noblox.js')


module.exports = {
    cooldown: 15,
    data: new SlashCommandBuilder()
        .setName('player')
        .setDescription('see player info and more')
        .addStringOption(option => option.setName('username').setDescription('Enter a username').setRequired(true)),
    async execute(interaction, client) {
      
      const username = interaction.options.getString('username');
     await nbx.getIdFromUsername(username).then(async userId => {
       
      const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('info')
					.setLabel(`${username} info`)
					.setStyle('PRIMARY'),
			);
       
     }).catch(e => interaction.reply({content: 'i cant find this user'}))
   





           
    
 }
};