const mongoose = require('mongoose');

const pendingSchema = new mongoose.Schema({
  groupId: String,
  userId: Number,
  joinTime: String,
  endTime: String
  
});

pendingSchema.statics.addUser = async function (groupId, userId, joinTime) {
  if (!groupId || !userId || !joinTime )  throw new Error('invalid groupId, userId, joinTime');
  const user = await this.findOne({groupId, userId});
  if (user) await user.updateOne({joinTime});
  else await this.create({groupId, userId, joinTime}).catch(e => {console.error});
  

}





const schema = mongoose.model("pending", pendingSchema);

module.exports = schema;