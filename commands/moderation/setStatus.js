const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const nbx = require('noblox.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('setstatus')
        .setDescription('set transfer status')
      .addStringOption(option =>
            option.setName('commands') .setDescription('select command').setRequired(true).addChoices(
                    { name: 'Balance', value: 'balance' },
                    { name: 'Buy', value: 'buy' },
                    { name: 'Transfer', value: 'transfer' },
                    { name: 'all', value: 'all_commands' },
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
      
  
      let statusType;  
      if (status === 'lock_status') statusType = true;
      if (status === 'unLock_status') statusType = false;
      
      if (command === 'all_commands') {
      console.log('all', status)
      data.status.transfer = statusType;
      data.status.buy = statusType;
      data.status.balance = statusType
      data.save();
        
      interaction.reply({content: replys.})
    
      return console.log(data.status)
        
      }
        
      data.status[command] = statusType
      data.save();
      
     interaction.reply("done")
    
    console.log(data.status)






        



 
 
     
    }

}