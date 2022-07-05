const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const nbx = require('noblox.js');

module.exports = {
    cooldown: 25,
    data: new SlashCommandBuilder()
        .setName('stock')
        .setDescription('get group funds'),
        
    async execute(interaction, client) {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({content: client.generalReplys.noPermissions('ADMINISTRATOR'), ephemeral: true});


        const replys = client.cmdReplys;

        await client.database.servers.setGuild(interaction.guild.id);

        const data = await client.database.servers.findOne({guildId: interaction.guild.id});

        await nbx.setCookie(data.cookie).then(async () => {
        await nbx.getGroup(data.groupId).then(async group => {
        let funds = await nbx.getGroupFunds(data.groupId);
        let revenue = await nbx.getGroupRevenueSummary(data.groupId, "Year");

        let embed = new MessageEmbed()
        .setColor(client.embedColor)
        .setTitle(group.name)
        .setDescription(`**## Total Robux : (\`${funds}\`) \n\ ## Pending Robux : (\`${revenue.pendingRobux}\`) **`);

        interaction.reply({embeds: [embed]})

        }).catch(async => {
            interaction.reply({content: replys.noGroupId})
        })

        }).catch(e => {
            interaction.reply({content: replys.noCookie})
        })


        



 
 
     
    }

}