
const fs = require('fs');
const guildsModels = require('./src/models/guilds');
const userData = require('./src/models/users');
const {language , embedColor} = require('./src/config');
const mongoose = require('mongoose');
const { Client, Collection } = require('discord.js');
const discord = require('discord.js');
const express = require('express');
const app = express();


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
mongoose.connect(process.env.DB, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(result => {})
.catch(e => console.error);

app.listen(8000);
app.get('/', (req,res) => {
    res.send( '<center>' + client.user.username + '</center>')
})

client.login(process.env.Token);