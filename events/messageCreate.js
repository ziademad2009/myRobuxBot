module.exports = {
	name: 'message',
	execute(message, client) {
    
    const prefix = '!'
    
		console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);
    
if (!message.content.startsWith(prefix) || message.author.bot) return;

const args = message.content.slice(prefix.length).trim().split(/ +/);
const commandName = args.shift().toLowerCase();

if (!client.commands.has(commandName)) return;

const command = client.commands.get(commandName);

try {
	command.execute(message, args);
} catch (error) {
	// ...
}
    
	},
};