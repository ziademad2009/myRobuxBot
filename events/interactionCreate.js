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

        try {
            if (command.cooldown) {
                if (delay.has(`${command.data.name}-${interaction.user.id}`)) {
                    return interaction.channel.send(`You can use this command again after **${ms(delay.get(`${command.data.name}-${interaction.user.id}`) - Date.now(), { long: true }).includes('ms') ? '0 second' : ms(delay.get(`${command.data.name}-${interaction.user.id}`) - Date.now(), { long: true })}**`).then(m => {
                        setTimeout(async () => {
                            m.delete()
                        }, 4000)
                    })
      
                }


                await command.execute(interaction, client).catch(e => {})
                delay.set(`${command.data.name}-${interaction.user.id}`, Date.now() + (command.cooldown * 1000));
                setTimeout(() => {
                    delay.delete(`${command.data.name}-${interaction.user.id}`);
                }, command.cooldown * 1000);
            } else {
                await command.execute(interaction, client);
            }
        } catch (error) {
            console.log(error);
//            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }




 
 
    }
}