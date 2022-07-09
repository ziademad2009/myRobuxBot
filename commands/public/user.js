const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const noblox = require('noblox.js');
const pendingData = require('../../src/models/pendingUsers');



module.exports = {
    cooldown: 15,
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('get user')
        .addStringOption(option => option.setName('username').setDescription('Enter a username').setRequired(true)),
    async execute(interaction, client) {
      
        const username = interaction.options.getString('username');
         await noblox.getIdFromUsername(username).then(async (id) => {
           await client.database.servers.setGuild(interaction.guild.id);
           const data = await client.database.servers.findOne({guildId: interaction.guild.id});
           const groupsArray = [];
           await noblox.getGroups(id).then(groups => {
             groups.forEach(group => {
               groupsArray.push(parseInt(group));
             })
           })
           if (!groupsArray.includes(data.groupId)) return interaction.channel.send({content: `> **this user is not in the group**`, ephemeral: true})
          const usersData =  await pendingData.findOne({userId: id, groupId: data.groupId});
           if (!usersData.joinTime) return interaction.reply({content: `> **look like you are in the group and you can use transfer command**`});
           let embed = new MessageEmbed().setColor(client.embedColor).setDescription(`> **${usersData.joinTime}**`)
         }).catch(e => console.log(e), interaction.reply({content: '> **i cant find this user in roblox**', ephemeral: true}))
    
 }
};