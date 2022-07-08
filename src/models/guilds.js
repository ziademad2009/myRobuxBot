const mongoose = require('mongoose');

const guildsSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
    unique: true
  },
  language: String,
  prefix: String,
  cookie: String,
  code: [Object], 
  status: Boolean,
  proofchannel: String,
  thanksChannel: String,
  groupId: Number,
  price: Number,
  owner: String,
  thankschannel: Number,
  status: {
    buy: Boolean,
    transfer: Boolean,
    balance: Boolean
  },
  logsChannel: String

 
});

guildsSchema.statics.setLanguage = async function (guildId, language) {
  let oldData = await this.findOne({ guildId });
  if (language) language = language.toLowerCase();
  if (oldData) {
    oldData.language = language;
    return await oldData.save();
  } else {
    return await this.create({ guildId, language });
  }
}

guildsSchema.statics.setGuild = async function (guildId) {
  let oldData = await this.findOne({ guildId });
  if (oldData) return;
    return await this.create({ guildId});
  
};
guildsSchema.statics.setStatus = async function(guildId, commandname, status) {
  
  let data = await this.findOne({guildId});
  
  if (!data) data = await this.create({guildId});
  
  let commands = ['transfer', 'buy', 'balance'];
  
  if (!commandname.includes(commands)) return 'notFound';
  
  if (data.status[commandname] === status) return 'same';
  
  data.status[commandname] = status;
  
  data.save();
  
  return 'done';
  
}






const Guilds = mongoose.model("Guilds", guildsSchema);

module.exports = Guilds;