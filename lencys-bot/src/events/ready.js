const ctx = new (require('../interfaces/context.js'));

const restartingModel = require('../models/restart.js')

const chalk = require('chalk');
const moment = require('moment-timezone');

module.exports = {
  
  name: 'ready',
  disabled: false,

  run: async (client) => {

    await restartingModel.updateOne({ _id: '6143310c7674da034c2abc68' }, { status: true }).catch((error) => console.log(error));

    setTimeout(() => {
  
      console.log(`${chalk.bold.hex('#FFFFFF')(`${moment().tz('Europe/Istanbul').format('hh:mm:ss')}`)}\n\n  Guilds:       ${chalk.hex('#FFFFFF')(`${client.guilds.cache.size.toLocaleString(undefined, { minimumFractionDigits: 0 })}`)}\n  Users:        ${chalk.hex('#FFFFFF')(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString(undefined, { minimumFractionDigits: 0 })}`)}\n  Channels:     ${chalk.hex('#FFFFFF')(`${(client.channels.cache.filter(c => c.type == 'GUILD_TEXT').size + client.channels.cache.filter(c => c.type == 'GUILD_VOICE').size).toLocaleString(undefined, { minimumFractionDigits: 0 })}`)}\n\n  Commands:     ${chalk.hex('#FFFFFF')(`${client.commands.size}`)}\n\n  Node.js:      ${chalk.hex('#FFFFFF')(`${process.version.replace(`v`, ``)}`)}\n  Discord.js:   ${chalk.hex('#FFFFFF')(`${require('discord.js').version}`)}\n`);
    }, 1000);
  
    setTimeout(async () => {
  
      await console.log(`${ctx.config.log.time} The reboot is complete.`);
  
      await restartingModel.updateOne({ _id: '6143310c7674da034c2abc68' }, { status: false }).catch((error) => console.log(error));
    }, 60000);
  },
};