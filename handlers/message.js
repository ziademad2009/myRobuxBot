const fs = require('fs');

module.exports = async (client) => {
  const commandsFolder = fs.readdirSync('./messageCommands');
  
  for (folder of commandsFolder) {
    const commands = fs.readdirSync(`./messageCommands/${folder}`).filter(file => file.endsWith('.js'));
    for (command of commands) {
      const comm = require(`../messageCommands/${folder}/${command}`)
       client.commands.set(comm.name, comm);
    } 
  }
 
     // client.commands.set(command.name, command);
    
  
}