const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const nbx = require('noblox.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('time')
        .setDescription('know robux arrive time'),
        
    async execute(interaction, client) {
       
        const replys = client.cmdReplys;
        await interaction.deferReply();
        await client.database.servers.setGuild(interaction.guild.id);
        const data = await client.database.servers.findOne({guildId: interaction.guild.id});
        await nbx.setCookie(data.cookie).then(async () => {
        await nbx.getGroup(data.groupId).then(async group => {
        let transactions = await nbx.getGroupTransactions(data.groupId, "Sale");
        transactions = transactions.filter(r => r.isPending === true);
          let revenue = await nbx.getGroupRevenueSummary(data.groupId, "Year");
        let embed = new MessageEmbed()
        .setColor(client.embedColor)
        .setTitle(group.name)
        .setFooter({text:`total robux: ${revenue.pendingRobux}`})
        let date = new Date();
    await  transactions.forEach(info => {
      let oldTime = {
        h: info.created.getHours().toLocaleString('ar-EG'),
        m: info.created.getMinutes().toLocaleString('ar-EG'),
      }
     info.created = info.created.toDateString().toLocaleString('ar-EG').split(" ");
     embed.addField(`${parseInt(info.currency.amount * 0.7)}\`R\` will arrive at :`, `**\`${parseInt(info.created[2]) + parseInt(5)}\\${+date.getMonth() + +1}\\${date.getFullYear()} - ${oldTime.h}:${oldTime.m}\`**`) 
     // console.log(parseInt(info.currency.amount * 0.7 ), parseInt(info.created[2]) + 5)
    })
      await interaction.editReply({embeds: [embed]})
        

}).catch(async error => {
    await interaction.editReply({content: replys.noGroupId});
    console.log(error)
})

}).catch(e => {
    interaction.editReply({content: replys.noCookie});
    console.log(e)
})
     
    }

};