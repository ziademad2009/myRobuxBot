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
        
        	new MessageButton()
        	.setCustomId('avatar')
					.setLabel(`${username} avatar`)
					.setStyle('PRIMARY'),
        
			);
       
       		await interaction.reply({  components: [row] });
       
      const filter = i =>  i.user.id === interaction.user.id;

     const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async i => {
     
	    if (i.customId === 'info') {
		  await i.update({ content: 'player info' });
	    
      };
     
    if (i.customId === 'avatar') {
      
      let thumbnail_default = await nbx.getPlayerThumbnail(userId)
      
      let embed = new MessageEmbed()
      .setColor(client.embedColor)
      .setImage(thumbnail_default[0].imageUrl)
		   await i.update({ embeds: [embed] });
      
	   }
  });

collector.on('end', collected => console.log(`Collected ${collected.size} items`));
       
     }).catch(e => interaction.reply({content: 'i cant find this user'}))
   





           
    
 }
};