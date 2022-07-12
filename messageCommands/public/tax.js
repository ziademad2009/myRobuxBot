const {MessageEmbed} = require('discord.js');

module.exports = {
	name: 'tax',
	description: 'know robux tax!',
	async execute(message, args, client) {
    
      const replys = client.cmdReplys;
      const sdb =  client.database.servers;
      const data = await sdb.findOne({guildId: message.guild.id});
      if (isNaN(args[0])) return message.reply({content: replys.isNaN})
      let price = data.price || 1250; 
      let priceOfnumber = parseInt(args[0] * price * 20 / 19 + 1);
      let embed = new MessageEmbed()
      .setColor(client.embedColor)
      .addField(`ROBUX PRICE IS :`, '```'+priceOfnumber+'```')
      message.reply({embeds: [embed]})
 
		
	},
};