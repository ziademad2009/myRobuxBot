const noblox = require('noblox.js');
const data = require('../src/models/guilds');
const {server} = require('../src/config');

(async () => {
  
const data = await data.findOne({guildId: '950871215856316437'});
  
 await noblox.setCookie(data.cookie).then(async result => {
   
 let evt =  await noblox.onJoinRequestHandle(data.groupId);
   
 evt.on('data', async  (request) => {
   
 console.log(request.requester.username);
   
 const id = await noblox.getIdFromUsername(request.requester.username);
 
 evt.emit('handle', request, true, function () {  
   console.log(`Welcome ${id} to the group`);
 });
 

});



  console.log('logged to '+result.UserName)
 }).catch(e => {console.log(`login with cookie and group first`)})

})();