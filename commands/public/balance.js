const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
    cooldown: 15,
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('see your balance or user balance or trade balance with user.')
        .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(false))
        .addNumberOption(option => option.setName('amount').setDescription('Enter a number').setRequired(false)),
    async execute(interaction, client) {

    const replys = client.cmdReplys;
    let embed = new MessageEmbed().setColor(client.embedColor)
    let user = interaction.options.getUser('target') || interaction.user;
    if (user.bot) return interaction.reply({content: replys.bot})
    await client.database.users.setUser(user.id);
    const data = await client.database.users.findOne({userId: user.id});
    const coins = data.coins;
    if (user.id === interaction.user.id) embed.setDescription(replys.youBalance(coins));
    if (user.id !== interaction.user.id) embed.setDescription(replys.userBalane(user.username, coins))
    return interaction.reply({embeds: [embed]});


           
    
 }
};