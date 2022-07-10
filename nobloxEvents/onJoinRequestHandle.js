const noblox = require('noblox.js');
const data = require('../src/models/guilds');
const {server} = require('../src/config');
const userData = require('../src/models/pendingUsers')

let date = new Date();
date = date.toLocaleString('en-EG')
setup()
async function setup()  {
const guildData = await data.findOne({guildId: '904487912408764536'});
 await noblox.setCookie(guildData.cookie).then(async result => {
try{  
 let evt =  await noblox.onJoinRequestHandle(guildData.groupId)
 evt.on('data', async  (request) => {
 // console.log(request.requester.username);
 const id = await noblox.getIdFromUsername(request.requester.username);
 evt.emit('handle', request, true, async  () => { 
   await userData.addUser(guildData.groupId, id, `${date}`);
 });
evt.on('error', async error => {
console.log(error)
})
})
}catch(error) {

}
console.log('logged to '+result.UserName)
}).catch(e => {console.log(e), console.log(`login with cookie and group first`)})

};