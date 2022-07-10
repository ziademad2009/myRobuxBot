const fs = require('fs');

module.exports = async (client) => {
  const commandsFolder = fs.readdirSync('./messageCommands').filter(file => file.endsWith('.js'));
  for (fileCommand of commandsFolder) {
    const command = require(`../messageCommands/${fileCommand}`);
     client.commands.set(command.name, command);
    
  }
}