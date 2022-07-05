const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const nbx = require('noblox.js');

module.exports = {
  
    data: new SlashCommandBuilder()
        .setName('setcookie')
        .setDescription('set your group cookie')
        .addStringOption(option => option.setName('cookie').setDescription('Enter Your cookie').setRequired(true)),

        
    async execute(interaction, client) {

      if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({content: client.generalReplys.noPermissions('ADMINISTRATOR'), ephemeral: true});

        const replys = client.cmdReplys;
      
        await client.database.servers.setGuild(interaction.guild.id);
        const data = await client.database.servers.findOne({guildId: interaction.guild.id});
        const cookie = interaction.options.getString('cookie');
        await nbx.setCookie(cookie).then(response => {
        data.cookie = cookie;
        data.save();
        return interaction.reply({content: replys.done});
      }).catch(e => {
        return interaction.reply({content: replys.invalidCookie})
      })


     
     
    }

}