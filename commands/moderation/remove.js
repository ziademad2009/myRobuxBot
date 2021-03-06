const {
    SlashCommandBuilder
} = require('@discordjs/builders');
const {
    MessageEmbed
} = require('discord.js');
const nbx = require('noblox.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('remove robux from user')
        .addNumberOption(option => option.setName('robux').setDescription('Enter a amount').setRequired(true))
        .addUserOption(option => option.setName('user').setDescription('choose user to give robux').setRequired(true)),



    async execute(interaction, client) {

        if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({
            content: client.generalReplys.noPermissions('ADMINISTRATOR'),
            ephemeral: true
        });
        const replys = client.cmdReplys;
        const user = interaction.options.getUser('user');
        const number = interaction.options.getNumber('robux');

        if (user.bot) return interaction.reply({
            content: replys.bot,
            ephemeral: true
        });
        await client.database.users.setUser(user.id);
        const data = await client.database.users.findOne({
            userId: user.id
        });
        if (data.coins < number) return interaction.reply({content: replys.lowUserbalance, ephemeral: true})
        await interaction.deferReply();
       
        data.coins -= number;
        data.save();
        let embed = new MessageEmbed().setColor(client.embedColor).setDescription(replys.done(`<@!${interaction.user.id}>`, number, `<@!${user.id}>`))
        interaction.editReply({
            embeds: [embed]
        });

    }
};