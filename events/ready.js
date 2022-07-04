const { presence } = require('../src/config');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        client.user.setPresence(presence);
        console.log(`Logged in as ${client.user.tag}\n`);
    },
};