const ctx = new (require('../interfaces/context.js'));

const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  
  name: 'messageCreate',
  disabled: true,

  run: async (client, message) => {

    if (message.guild) {

      if (message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
  
        message.reply({
          embeds: [
            new MessageEmbed()
            .setColor(ctx.config.color.default)
            .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true, size: 2048, format: 'png' }))
          ],
          components: [
            new MessageActionRow().addComponents([
              new MessageButton().setStyle('DANGER').setEmoji(ctx.config.emoji.button.delete).setCustomId('delete').setDisabled(false),
            ]),
          ],
        }).then(async (fetch) => {
    
          fetch.createMessageComponentCollector({ componentType: 'BUTTON', filter: (clicker) => clicker.user.id == message.author.id }).on('collect', async (button) => {
    
            if (button.customId == 'delete') {
      
              fetch.delete();
      
              await button.deferUpdate();
            };
          });
        });
      };
    };
  },
};