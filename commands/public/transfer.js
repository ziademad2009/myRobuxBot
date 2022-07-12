const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');
const nbx = require('noblox.js');
const { createCanvas, loadImage } = require('canvas');


module.exports = {
     cooldown: 15,
    data: new SlashCommandBuilder()
        .setName('transfer')
        .setDescription('transfer robux')
        .addNumberOption(option => option.setName('amount').setDescription('Enter a amount').setRequired(true))
        .addStringOption(option => option.setName('username').setDescription('Enter a username').setRequired(true)),
      
    async execute(interaction, client) {
    
    const replys = client.cmdReplys;
    await client.database.servers.setGuild(interaction.guild.id);
    await client.database.users.setUser(interaction.user.id);
    const data2 = await client.database.servers.findOne({guildId: interaction.guild.id});
    if (data2 && data2.status.transfer === true) return interaction.reply({content: replys.lock, ephemeral: true });
     await interaction.deferReply();
     const number = interaction.options.getNumber('amount');
     const username = interaction.options.getString('username');
     const data1 = await client.database.users.findOne({userId: interaction.user.id});
     if (data1.coins < number) return await interaction.editReply({content: replys.lowBalance});
     await nbx.getIdFromUsername(username).then(async user => {
     await nbx.setCookie(data2.cookie).then(async result => {
     await nbx.getGroup(data2.groupId).then(async group => {
     const groups = [];;
     await nbx.getGroups(user).then(async result => await result.forEach(group => groups.push(group.Id)));
     if (!groups.includes(data2.groupId)) return await interaction.editReply({content: replys.notInGroup});
     let funds = await nbx.getGroupFunds(data2.groupId);
     if (funds < number) return await interaction.editReply({content: replys.lowFunds})
     await nbx.groupPayout(data2.groupid, user , number).then(async() => {
     data1.coins -= number;
     data1.save();
     let embed = new MessageEmbed().setColor(client.embedColor).setDescription(replys.done(number, username, data1.coins))
     await interaction.editReply({embeds: [embed], ephemeral: true});

  const proochannel = await interaction.guild.channels.cache.get(data2.proofchannel);
  if (!proochannel) return;
  let balanceing = await nbx.getGroupFunds(data2.groupId);
  let th = await nbx.getPlayerThumbnail(parseInt(user), 420, "png", true, "Headshot").then(async(a) => {
      let url = "";
  a.forEach(avatar => url = avatar.imageUrl);   
       
    const canvas = createCanvas(991, 172);
    const ctx = canvas.getContext('2d')
    const background = await loadImage('https://cdn.glitch.global/8e162bb4-d4c3-4bbc-8811-ac29c822a781/pay%20image%201.png?v=1657613444619');
    ctx.beginPath();
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.font = '15px impact';
    ctx.fillStyle = 'black';
    ctx.fillText(number.toLocaleString().toString(), 802.5, 42.4);
    ctx.font = "650 16px impact";
    ctx.fillText(number.toLocaleString().toString(), 864.5, 82.5);
    ctx.fillText(balanceing.toString(), 830.5, 105.7);
    ctx.font = "570 15.2px impact";
    ctx.fillText(username.toString(), 61, 35);
    ctx.font = '10px impact';
    ctx.fillStyle = 'Gray';
    (data1.booster === true)? ctx.fillText('premium', 65, 47) : ctx.fillText('Member', 65, 47);
    ctx.closePath();
    const userImage = await loadImage(url.toString());
    ctx.beginPath();
    ctx.arc(29, 34, 21, 0, Math.PI * 2 , true);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 7;
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    if (data1.booster === true) {
       ctx.drawImage(userImage, 11.5,16.5,35,35);
       const attach = new MessageAttachment(canvas.toBuffer(), 'payout.png');
      return client.webhook.send({content: replys.boosterReceipt(`<@!${interaction.user.id}>`, number), files: [attach]});
    }else {
     const attach = new MessageAttachment(canvas.toBuffer(), 'payout.png');
     proochannel.send({content: replys.Receipt(`<@!${interaction.user.id}>`, number), files: [attach]});
    }
 

    
    })
        
    }).catch(async e => {
      await interaction.editReply({content: replys.newInGroup});console.log(e)
    })
    }).catch(e => interaction.editReply({content: replys.notWorkNow}));
    }).catch(e => interaction.editReply({content: replys.notWorkNow}));
    }).catch(e => interaction.editReply({content: replys.notFoundInRoblox}));






        



 
 
     
    }

}