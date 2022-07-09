const mongoose = require('mongoose');

const pendingSchema = new mongoose.Schema({
  groupId: String,
  userId: Number,
  joinTime: String,
  endTime: String
  
});

pendingSchema.statics.addUser = async function (groupId, userId, joinTime, endTime) {
  if (!groupId || !userId || !joinTime || !endTime)  throw new Error('invalid groupId, userId, joinTime, endTime');
  const user = await this.findOne({groupId, userId});
  if (user) await user.updateOne({joinTime, endTime});
  else await this.create({groupId, userId, joinTime, endTime}).catch(e => {console.error});
  

}





const schema = mongoose.model("pending", pendingSchema);

module.exports = schema;