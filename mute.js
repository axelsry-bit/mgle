const Discord = require('discord.js')
const prefix = require('../config.json').prefix

module.exports = {
    name: `mute`,
    description: `Rendre un utilisateur muet.`,
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
        let raison = args.slice(1).join(" ")
        if(!user || !raison) return message.channel.send(`Usage de la commande :\n\`${prefix}mute @User Raison\``)
        if(user.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Vous ne pouvez pas rendre muet cette personne !`)
        if(user.user.id === "416593143765401600" || user.user.id === "706302538106011678") return message.channel.send(`Ce membre ne peut pas être rendu muet.`)
        if(!user.manageable) return message.channel.send(`Je ne peux pas gérer les rôles de cet utilisateur !`)
        user.roles.add(role)
        message.delete();
    }
}