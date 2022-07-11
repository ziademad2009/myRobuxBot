
module.exports = {
  prefix: '!',
  language: 'en',
  owners: ["860865950945378325"],
  token: '',
  embedColor: `BLUE`,
  "presence": {
    "status": `dnd`,
    "activities": [{
      "type": `PLAYING`,
      "name": `/help | !help`
    }]
  },
  db: (password) => `mongodb+srv://ZIAD:${password}@cluster0.qizpg.mongodb.net/ROBUXSYSTEM`
  
};