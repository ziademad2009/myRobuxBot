const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const nbx = require('noblox.js');

module.exports = {
    cooldown: 15,
    data: new SlashCommandBuilder()
        .setName('buy')
        .setDescription('buy robux')
        .addNumberOption(option => option.setName('amount').setDescription('Enter a amount').setRequired(true)),       
    async execute(interaction, client) {
        if (!interaction.channel.name.startsWith('ticket')) return;

        const replys = client.cmdReplys;
        await client.database.servers.setGuild(interaction.guild.id);
        const data = await client.database.servers.findOne({guildId: interaction.guild.id});
        const number = interaction.options.getNumber('amount');
        let key = `buy-${interaction.user.id}-${interaction.guild.id}`;
        if (client.BuyCooldown.has(key)) return interaction.reply({content: replys.haveOne});
        client.BuyCooldown.add(key);
        let price = data.price || 1250;
        let owner = data.owner;
        let probotMessage = parseInt(price * number);
        let transferPrice = parseInt(probotMessage * 20 / 19 + 1);

        let embed = new MessageEmbed()
        .setColor(client.embedColor)
        .setDescription(`\`\`\` #credits ${owner} ${transferPrice} \`\`\``)
      
      let m = await interaction.reply({embeds: [embed]});
        console.log(probotMessage, interaction.user.username)

        const filter = m => m.author.id === '282859044593598464' && m.content.includes(probotMessage) && m.content.includes(`<@!${owner}>`);
        const collector = interaction.channel.createMessageCollector({ filter, time: 10000 });
        
        collector.on('collect', async m => {
            await client.database.users.setUser(interaction.user.id);
            const data = await client.database.users.findOne({userId: interaction.user.id});
            data.coins += number;
            data.save();
            let embed = new MessageEmbed().setColor(client.embedColor);
            let embed2 = new MessageEmbed().setColor(client.embedColor);
            embed.setDescription(replys.done(number, data));
            embed2.setDescription(replys.delteTicket);
            await interaction.user.send({embeds: [embed]});
            await interaction.channel.send({embeds: [embed2]});
            client.BuyCooldown.delete(key)
            return setTimeout(async () => {
               interaction.channel.delete() || interaction.channel.permissionOverwrites.edit(interaction.user, { VIEW_CHANNEL: false }).catch(e => {console.log}); 
            }, 10*5000);
        });
        
        collector.once('end', async m => {
         client.BuyCooldown.delete(key);
          if (interaction.channel)  await interaction.reply({content: replys.end, ephemeral: true}).catch(e => {console.log})
     //    await interaction.channel.send({content: replys.end, ephemeral: true}).catch(e => {console.log})
           return m.delete();
        });


        



 
 
     
    }

}