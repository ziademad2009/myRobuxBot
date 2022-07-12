const { presence } = require('../src/config');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        client.user.setPresence(presence);
        console.log(`Logged in as ${client.user.tag}\n`);
      //  await client.guilds.cache.forEach(async guild => await client.database.servers.setGuild({guildId: guild.id}).catch(e => {}))
    },
};