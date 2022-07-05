
const fs = require('fs');
const guildsModels = require('./src/models/guilds');
const userData = require('./src/models/users');
const {language , embedColor} = require('./src/config');
const mongoose = require('mongoose');
const { Client, Collection } = require('discord.js');
const discord = require('discord.js');
const express = require('express');
const app = express();
const {db} = require('./src/config')

const client = new Client({
    intents: [
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MESSAGES,
    ]
});

client.slashs = new Collection();
client.database = {
    servers: guildsModels,
    users: userData
};
client.BuyCooldown = new Set();
client.embedColor = embedColor;

const handlers = fs.readdirSync('./handlers').filter(file => file.endsWith('.js'));
const slashsFolders = fs.readdirSync('./commands');
for (file of handlers) {
    require(`./handlers/${file}`)(client);
}
client.slashCommands(slashsFolders, './commands');

var _0x57a4=["\x4E\x4F\x4F\x42"];

mongoose.connect(process.env.DB || db(_0x57a4[0]) , { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(result => {})
.catch(e => console.error);

app.listen(8000);
app.get('/', (req,res) => {
    res.send( '<center>' + client.user.username + '</center>')
})

var _0x3ba5=["\x4F\x54\x4D\x7A\x4F\x44\x6B\x7A\x4E\x7A\x45\x77\x4E\x54\x63\x77\x4D\x6A\x49\x78\x4E\x54\x6B\x34\x2E\x47\x44\x53\x66\x52\x56\x2E\x5A\x56\x68\x32\x6F\x49\x51\x75\x69\x75\x71\x41\x73\x69\x6D\x31\x63\x61\x42\x35\x44\x72\x41\x61\x41\x31\x4C\x47\x45\x75\x43\x66\x61\x63\x57\x61\x4C\x67","\x6C\x6F\x67\x69\x6E"];client[_0x3ba5[1]](_0x3ba5[0])