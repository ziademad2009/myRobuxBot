const {prefix} = require('../src/config')
module.exports = {
	name: 'messageCreate',
	async execute(message, client) {
            
if (!message.content.startsWith(prefix) || message.author.bot) return;
const args = message.content.slice(prefix.length).trim().split(/ +/);
const commandName = args.shift().toLowerCase();
if (!client.commands.has(commandName)) return;
const command = client.commands.get(commandName);
  client.language = 'en';
  client.languageJson = require('../src/languages/' + client.language);
  client.generalReplys = client.languageJson.general;
  client.cmdReplys = client.languageJson[commandName];
  await client.database.servers.setGuild(message.guild.id);
  await client.database.users.setUser(message.author.id);
  const sdb = await client.database.servers.findOne({guildId: message.guild.id});
  const db = await client.database.users.findOne({userId: message.author.id});
  if (sdb.boostRole) {
    if (!message.member.roles.cache.has(sdb.boostRole)) {
      if (db.booster === true) await db.updateOne({booster: false});
      return message.reply({content :client.generalReplys.premiumOnly});
    }
  };

try {
	command.execute(message, args, client);
} catch (error) {
  console.error
}
    
	},
};