module.exports = {
  
  general: {
    timeOut: (t) => `> **🙄 - Please wait ${t} seconds!**`,
    noPermissions: (p) => `> **You cannot use this command, because you do not have the following permissions [${p}]!**`,
    cmdDm: `> **🙄 This command can only be used in DMs!**`
  },
  
  help: {
    info: {
      description: `See all commands and inquire about how to use a particular command.`
    },
    ghTitle: `**Commands List**`,
    ghFooter: (p) => `For more information on a specific command,\nrun ${p}help (Command)`,
    ghSections: [
      `**General**`,
      `**Admins**`
    ],
    chTitle: (c) => `**Command: ${c}**`,
    chFooter: ``,
    chSections: [
      `**Aliases:**`,
      `**Usages:**`,
      `**Examples:**`
    ],
    chNotFound: `> **🙄 - I can't find this command!**`
  },
  
  ping: {
    info: {
      description: `Test the bots response time.`
    },
    pong: '> **🏓 Pong...**'
  },
  
  setlanguage: {
    info: {
      description: `Sets your preferred language to the bot.`
    },
    notFoundLanguage: (l) => `> **🙄 Supported languages are __${l}__**`,
    done: `> **✅ Language changed successfully!**`
  },
  balance: {
    info: {
      description: `see your balance or user balance or trade balance with user.`
    },
    youBalance: (balance) => `> **you current balance is \`${balance}\`**`,
    userBalane: (user, balance) => `> **${user} balance is \`${balance}\`**`,
    bot: `> **:thinking: bots do not have robux!**`
  },
  setcookie: {
    info: {
      description: `set your group cookie`,
    },
    done: `> **The cookie has been successfully logged in ✅**`,
    invalidCookie: `> **Please select a valid cookie 🙄**`
  },
  setgroup: {
    info: {
      description: `set your roblox group id`,
    },
    noCookie: `> **Please select a cookie first 🙄**`,
    invalidId: `> **Please select a valid ID to use 🙄**`,
    notYourGroup: `> **Please select a group that belongs to you 🙄**`,
    done: `> **The group has been selected successfully ✅**`
  },
  setproofchannel: {
    done:  (channel) => `> **done set <#${channel}> as proof channel ✅**`
  },
  setprice: {
    done: (price) => `> **done set the price \`${price}\`**`
  },
  setowner: {
    done: `> **Recipient of earnings has been selected successfully**`
  },
  buy: {
    done: (number, data) => `> **done transfer \`${number}\` to your account and your current account balance is \`${data.coins}\`✅**`,
    delteTicket: `> **the ticket will delete in \`10\`s ✅**`,
    end: `> **Transfer time has expired 🙄**`,
    haveOne: `> **Already have a purchase 🙄**`
  
  },
  transfer: {
    lowBalance: `> **Sorry, your balance is not enough🙄**`,
    notFoundInRoblox: `> **i cant find this user in roblox 🙄**`,
    notWorkNow: `> **sorry transfer command is Unavailable for now 🙄**`,
    notInGroup: `> **This user is not in the group 🙄**`,
    newInGroup: `> **Looks like this player is new to the group and he has to wait two weeks 🙄**`,
    lowFunds: `> **sorry we dont have this amount of robux in group 🙄**`,
    done: (amount, account, balance) => `> **done transfer \`${amount}\` to ${account} and your current account balance is ${balance}**`,
    Receipt: (user, amount) => `${user} bought \`${amount}\`R from the group`
   }





};