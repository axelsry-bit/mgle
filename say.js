const Discord = require('discord.js')

module.exports = {
    name: `say`,
    description: `Faire parler le bot.`,
    execute(client, message, args) {
        if(!message.member.hasPermission('MANAGE_GUILD')) return
        message.delete()
        message.channel.send(args.slice(0).join(" "))
    }
}