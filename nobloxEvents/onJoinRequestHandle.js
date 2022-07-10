const noblox = require('noblox.js');
const data = require('../src/models/guilds');
const {server} = require('../src/config');
const userData = require('../src/models/pendingUsers')

let date = new Date();
date = date.toLocaleString('ar-EG')


// let fullDate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`
console.log(date)

setup()
async function setup()  {
const guildData = await data.findOne({guildId: '950871215856316437'});
 await noblox.setCookie(guildData.cookie).then(async result => {
 let evt =  await noblox.onJoinRequestHandle(guildData.groupId);
 evt.on('data', async  (request) => {
 // console.log(request.requester.username);
  
 const id = await noblox.getIdFromUsername(request.requester.username);
 evt.emit('handle', request, true, async  () => { 
   await userData.addUser(guildData.groupId, id, `${date}`);
 });
   
evt.on("error", async (err) => {
  console.log('hello')
})
 

});

  console.log('logged to '+result.UserName)
 }).catch(e => {console.log(`login with cookie and group first`)})

};