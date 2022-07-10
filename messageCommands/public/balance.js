const {MessageEmbed} = require('discord.js');

module.exports = {
	name: 'balance',
	description: 'know your balance!',
	async execute(message, args, client) {
    
    const replys = client.cmdReplys;
    const guildData = await client.database.servers.findOne({guildId:message.guild.id});
    if (guildData && guildData.status.balance === true) return message.reply({content: replys.lock, ephemeral: true });

    let embed = new MessageEmbed().setColor(client.embedColor)
    let user = message.author
    if (user.bot) return message.reply({content: replys.bot})
    await client.database.users.setUser(user.id);
    const data = await client.database.users.findOne({userId: user.id});
    const coins = data.coins;
    if (user.id === message.author.id) embed.setDescription(replys.youBalance(coins));
 //   if (user.id !== message.user.id) embed.setDescription(replys.userBalane(user.username, coins))
    return message.reply({embeds: [embed]});
 
		
	},
};