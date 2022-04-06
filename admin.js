const Discord = require('discord.js')

module.exports = {
    name: `admin`,
    description: `Permet de modifier le bot.`,
    execute(client, message, args) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Vous n'avez pas la permission d'utiliser cette commande !`)
        client.user.setUsername(message.guild.name)
        client.user.setAvatar(message.guild.iconURL())
    }
}
