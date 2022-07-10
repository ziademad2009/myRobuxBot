const {prefix} = require('../src/config')
module.exports = {
	name: 'messageCreate',
	execute(message, client) {
            
if (!message.content.startsWith(prefix) || message.author.bot) return;

const args = message.content.slice(prefix.length).trim().split(/ +/);
    
const commandName = args.shift().toLowerCase();

if (!client.commands.has(commandName)) return;

const command = client.commands.get(commandName);

try {
	command.execute(message, args, client);
} catch (error) {
  console.error
}
    
	},
};