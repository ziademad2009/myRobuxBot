const {language} = require('../src/config');
const {Collection} = require('discord.js')
const cooldowns = new Set();


module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        //if (!interaction.isChatInputCommand()) return;
        if (!interaction.isCommand()) return;

        const command = client.slashs.get(interaction.commandName);
        if (!command) return // delete command;
        const commandName = interaction.commandName;
        const guildData = await client.database.servers.findOne({ guildId: (interaction.guild) ? interaction.guild.id : '' });
        client.language = (guildData && guildData.language && client.languages.includes(guildData.language)) ? guildData.language : language;
        client.languageJson = require('../src/languages/' + client.language);
        client.generalReplys = client.languageJson.general;
        client.cmdReplys = client.languageJson[interaction.commandName];

        let key = `${commandName}-${interaction.user.id}-${interaction.guild.id}`;


 
        if (cooldowns.has(key))  {
            setTimeout(() => {
                cooldowns.delete(key);
            }, client.command.cooldown* 1000 || 3* 1000);
            return 
        };


 
        try {
            await command.execute(interaction, client);
            cooldowns.add(key);
        
    
        } catch (error) {

            console.log(error);
            // await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}