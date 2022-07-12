const {language} = require('../src/config');
const {Collection} = require('discord.js')
const delay = new Collection();
const ms = require('ms');


module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
//        if (!interaction?.isChatInputCommand()) return console.log('hello')
        if (!interaction.isCommand()) return ;

        const command = client.slashs.get(interaction.commandName);
        if (!command) return // delete command;
        const commandName = interaction.commandName;
        const guildData = await client.database.servers.findOne({ guildId: (interaction.guild) ? interaction.guild.id : '' });
        client.language = (guildData && guildData.language && client.languages.includes(guildData.language)) ? guildData.language : language;
        client.languageJson = require('../src/languages/' + client.language);
        client.generalReplys = client.languageJson.general;
        client.cmdReplys = client.languageJson[interaction.commandName];
        
        if (delay.has(`${interaction.user.id}-${command.data.name}`)) {
          await interaction.deferReply({ephemeral: true});
          return interaction.editReply({content: client.generalReplys.timeOut(command.cooldown || 5)});
        }
        delay.set(`${interaction.user.id}-${command.data.name}`, true);
        setTimeout(() => {
         delay.delete(`${interaction.user.id}-${command.data.name}`);
        },command.cooldown * 1000 || 5 * 1000);
      
        if (command.data.name === 'robuxtax' || command.data.name === 'time' || command.data.name === 'player') {
          await client.database.users.setUser(interaction.user.id);
          const data = await client.database.users.findOne({userId: interaction.user.id});
          if (data.booster !== true) {
            await interaction.deferReply({ephemeral: true})
          }
          
        }
        
        await command.execute(interaction, client).catch(e => console.log(e));
 
 
    }
}