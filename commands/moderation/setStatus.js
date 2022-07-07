const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const nbx = require('noblox.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('setstatus')
        .setDescription('set transfer status')
      .addStringOption(option =>
            option.setName('commands') .setDescription('select command').setRequired(true).addChoices(
                    { name: 'Balance', value: 'balance_command' },
                    { name: 'Buy', value: 'buy_command' },
                    { name: 'Transfer', value: 'Transfer_command' },
            ))
        .addStringOption(option =>
            option.setName('status') .setDescription('set status').setRequired(true).addChoices(
                    { name: 'Lock', value: 'lock_status' },
                    { name: 'Unlock', value: 'unLock_status' },
                )),
        
    async execute(interaction, client) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({content: client.generalReplys.noPermissions('ADMINISTRATOR'), ephemeral: true});


        const replys = client.cmdReplys;
        await client.database.servers.setGuild(interaction.guild.id);
        const data = await client.database.servers.findOne({guildId: interaction.guild.id});
      
        const command = interaction.options.getString('commands');
        const status = interaction.options.getString('status');
      
        console.log(command , status)






        



 
 
     
    }

}