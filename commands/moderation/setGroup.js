const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const nbx = require('noblox.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('setgroup')
        .setDescription('set your roblox group')
        .addNumberOption(option => option.setName('groupid').setDescription('Enter your group id').setRequired(true)),

        
    async execute(interaction, client) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({content: client.generalReplys.noPermissions('ADMINISTRATOR'), ephemeral: true});


        const replys = client.cmdReplys;
        await client.database.servers.setGuild(interaction.guild.id);
        const data = await client.database.servers.findOne({guildId: interaction.guild.id});
        const groupId = interaction.options.getNumber('groupid');
        await nbx.setCookie(data.cookie).then(async user => {
            await nbx.getGroup(groupId).then(async group => {
                if (group.owner.userId !== user.UserID) return interaction.reply({content: replys.notYourGroup});
                data.groupId = groupId;
                data.save();
               return interaction.reply({content: replys.done})

         }).catch(err => {
            return interaction.reply({content: replys.invalidId})
         })
        }).catch(e => {
            return interaction.reply({content: replys.noCookie})
        })

 
 
     
    }

}