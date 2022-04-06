const Discord = require('discord.js')

module.exports = {
    name: `unmute`,
    description: `Rendre la voix à un utilisateur.`,
    execute(client, message, args) {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return
        let role = message.guild.roles.cache.find(r => r.name === "Muet")
        if(!role) {
            message.guild.roles.create({ data: { name: "Muet", mentionable: false }, reason: "Muet" }).then(rol => {
                message.channel.send(`Rôle ${rol} créé !`)
                message.guild.channels.cache.forEach(channel => {
                    channel.updateOverwrite(rol, { "SEND_MESSAGES": false, "ADD_REACTIONS": false, "SEND_TTS_MESSAGES": false, "SPEAK": false }, "Configuration des permissions pour le rôle muet.")
                })
            }).catch(err => {
                message.channel.send(new Discord.MessageEmbed()
                .setTitle(`Erreur !`)
                .setDescription(`\`\`\`${err}\`\`\``))
            })
        }
        role = message.guild.roles.cache.find(r => r.name === "Muet")
        let user = message.mentions.members.first()
        if(!user) return message.channel.send(`Usage de la commande :\n\`.unmute @User\``)
        if(!user.manageable) return message.channel.send(`Je ne peux pas gérer les rôles de cet utilisateur !`)
        if(!user.roles.cache.has(role)) return message.channel.send(`Cet utilisateur n'est pas mute !`)
        user.roles.remove(role)
        message.delete();
    }
}