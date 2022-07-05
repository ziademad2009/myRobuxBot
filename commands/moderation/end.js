const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
    cooldown: 15,
    data: new SlashCommandBuilder()
        .setName('end')
        .setDescription('end buy'),
    async execute(interaction, client) {

    const replys = client.cmdReplys;
    let key = `buy-${interaction.user.id}-${interaction.guild.id}`;

    if (!client.BuyCooldown.has(key)) return await interaction.reply({content: replys.noHave, ephemeral: true});
    client.BuyCooldown.delete(key);
    return await interaction.reply({content: replys.done, ephemeral: true});



           
    
 }
};