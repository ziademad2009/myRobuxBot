const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');


module.exports = {
    cooldown: 15,
     data: new SlashCommandBuilder()
        .setName('robuxtax')
        .setDescription('robux tax'),
    //    .addNumberOption(option => option.setName('robux').setDescription('Enter a robux').setRequired(true)),
    async execute(interaction, client) {
      
     // const sdb =  client.database.servers;
     // const data = await sdb.findOne({guildId: interaction.guild.id});
     // let price = data.price || 1250;
     // const number = interaction.options.getNumber('robux'); 
     // let priceOfnumber = parseInt(number * 20 / 19 + 1);
     // let embed = new MessageEmbed()
     // .setColor(client.embedColor)
     // .addField(`ROBUX PRICE IS :`, '```'+priceOfnumber+'```')
     // interaction.reply({embeds: [embed]})
    
 }
};