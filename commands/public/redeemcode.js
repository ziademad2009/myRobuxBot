const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
 cooldown: 15,
 data: new SlashCommandBuilder()
    .setName('redeemcode')
    .setDescription('redeem code for robux')
    .addStringOption(option => option.setName('codename').setDescription('Enter code name here').setRequired(true)),


    async execute(interaction, client) {
      
    let guildId = interaction.guild.id;   
      
    const replys = client.cmdReplys;
      
    await client.database.servers.setGuild(guildId);
      
    await client.database.users.setUser(interaction.author.id);
      
    const data = await client.database.servers.findOne({guildId}); 
      
    const data2 = await client.database.users.findOne({userId: interaction.user.id});
    
    const codeName = interaction.options.getString("codename");
   
     await interaction.reply({content: 'test'})
      
      
      
const code = data.find(c => c.code === codeName);

// if(!code) return interaction.reply({content: "كود غير موجود"});
// if (code.usageBy.includes(interaction.user.id)) return await interaction.reply({content: replys.used});
// if (code.usageBy.length === code.limit) {
  
//    await interaction.reply({content: replys.notFoundCode})
// };
 

    }
 };


    // data.code.push({
    //   code: codeName, 
    //   limit: limit, 
    //   amount: amount, 
    //   usageBy: []  
    //   });   