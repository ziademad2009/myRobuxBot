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
    const number = interaction.options.getNumber('amount');
    const guildData = await client.database.servers.findOne({guildId:interaction.guild.id});
    if (guildData && guildData.status.balance === true) return interaction.reply({content: replys.lock, ephemeral: true });
    if (!number) {
    let embed = new MessageEmbed().setColor(client.embedColor)
    let user = interaction.options.getUser('target') || interaction.user;
    if (user.bot) return interaction.reply({content: replys.bot})
    await client.database.users.setUser(user.id);
    const data = await client.database.users.findOne({userId: user.id});
    const coins = data.coins;
    if (user.id === interaction.user.id) embed.setDescription(replys.youBalance(coins));
    if (user.id !== interaction.user.id) embed.setDescription(replys.userBalane(user.username, coins))
    return interaction.reply({embeds: [embed]});
    };
    if (number) {
      let user = interaction.options.getUser('target');
      if (user.bot) return interaction.reply({content: replys.bot})
      await client.database.users.setUser(user.id);
      await client.database.users.setUser(interaction.user.id);
      const data = await client.database.users.findOne({userId: interaction.user.id});
      const data2 = await client.database.users.findOne({userId: user.id});
      let coins = data.coins;
      if (coins < number) return interaction.reply({content: `> **you balance is not enough **`});
      data.coins -= number;
      data2.coins += number;
      data2.save();
      data.save();
      let embed = new MessageEmbed().setColor(client.embedColor).setDescription(`> **done transfer ${number} to <@${user.id}>**`)
      return interaction.reply({embeds: [embed]});
      
    }

    



           
    
 }
};