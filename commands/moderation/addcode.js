const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
 cooldown: 15,
 data: new SlashCommandBuilder()
    .setName('addcode')
    .setDescription('add new code')
    .addStringOption(option => option.setName('codename').setDescription('Enter code name here').setRequired(true))
    .addNumberOption(option => option.setName('amount').setDescription('Enter a amount').setRequired(true))
    .addNumberOption(option => option.setName('limit').setDescription('Enter a limit of users').setRequired(true)),

    async execute(interaction, client) {
    if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({content: client.generalReplys.noPermissions('ADMINISTRATOR'), ephemeral: true});
      
    let guildId = interaction.guild.id;   
    const replys = client.cmdReplys;
    await client.database.servers.setGuild(guildId);
    const data = await client.database.servers.findOne({guildId});    
    const codeName = interaction.options.getString("codename");
    const amount = interaction.options.getNumber('amount');
    const limit = interaction.options.getNumber('limit'); 
      
    if (data.code.find(c => c.code === codeName)) return interaction.reply({content:  replys.same});   
      
    data.code.push({
      code: codeName, 
      limit: limit, 
      amount: amount, 
      usageBy: []  
      });       
   data.save()
   await interaction.reply({content: replys.done(codeName)});
     
    }
 };
