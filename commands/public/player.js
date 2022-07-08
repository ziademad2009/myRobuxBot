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
       
        const m =	await interaction.reply({  components: [row] }) 
        const filter = i =>  i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 100000 });
collector.on('collect', async i => {
  
	    if (i.customId === 'info') {
        let information = await nbx.getPlayerInfo({userId: userId})
        let thumbnail_default = await nbx.getPlayerThumbnail(userId, 420, "png", true, "body")
        
        let embed = new MessageEmbed()
        .setColor(client.embedColor)
        .setTitle(`${username} info`)
        .setURL(`https://www.roblox.com/users/${userId}/profile`)
        .addField(`**displayName**`, `${information.displayName}`, true)
        .addField(`**joinDate**`, `${information.joinDate}`, true)
        .addField(`**friendCount**`, `${information.friendCount}`, true)
        .addField(`**followerCount**`, `${information.followerCount}`, true)
        .setImage(thumbnail_default[0].imageUrl)
        await i.update({embeds: [embed]});
	    
      };
     
    if (i.customId === 'avatar') {
      let thumbnail_default = await nbx.getPlayerThumbnail(userId, 420, "png", true, "Headshot")      
      let embed = new MessageEmbed()
      .setColor(client.embedColor)
      .setTitle(username)
      .setURL(`https://www.roblox.com/users/${userId}/profile`)
      .setImage(thumbnail_default[0].imageUrl)
		   await i.update({ embeds: [embed] });
      
	   }
  });

collector.on('end', m => {});


       
}).catch(e => interaction.reply({content: 'i cant find this user'}))
   





           
    
 }
};