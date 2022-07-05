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
    const data = await client.database.servers.findOne({guildId});    
    const codeName = interaction.options.getString("codename");
    
     
const code = data.find(c => c.code === codeName);

if(!code) return interaction.reply({content: "كود غير موجود"});
if (code.usageBy.includes(interaction.user.id)) return await interaction.reply({content: replys.used});
if (code.usageBy.length === code.limit) {
  
   await interaction.reply({content: replys.notFoundCode})
};
 

cont gifted = code.amount
data.coins += gifted
      
const i = data.findIndex(c => c.code ===  codeName) 
data.code[i] 
   

//  await interaction.reply({content: replys.done(codeName)});
     
    
    
    }
 };


    // data.code.push({
    //   code: codeName, 
    //   limit: limit, 
    //   amount: amount, 
    //   usageBy: []  
    //   });   