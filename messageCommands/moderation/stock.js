const {MessageEmbed} = require('discord.js');
const nbx = require('noblox.js')

module.exports = {
	name: 'robux',
	description: 'know group balance!',
	async execute(message, args, client) {
    
    const replys = client.cmdReplys;
  

        await client.database.servers.setGuild(message.guild.id);
        const data = await client.database.servers.findOne({guildId: message.guild.id});
        await nbx.setCookie(data.cookie).then(async () => {
        await nbx.getGroup(data.groupId).then(async group => {
        let funds = await nbx.getGroupFunds(data.groupId);
        let revenue = await nbx.getGroupRevenueSummary(data.groupId, "Year");
        let embed = new MessageEmbed()
        .setColor(client.embedColor)
        .setTitle(group.name)
        .setDescription(`** - Total Robux : (\`${funds}\`) \n\ - Pending Robux : (\`${revenue.pendingRobux}\`) **`);
        message.reply({embeds: [embed]})

        }).catch(async => {
            message.reply({content: replys.noGroupId})
        })

        }).catch(e => {
            message.reply({content: replys.noCookie})
        })

   
 
		
	},
};