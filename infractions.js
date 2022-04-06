const Discord = require('discord.js')
const fs = require('fs')
const warns = JSON.parse(fs.readFileSync('./warns.json'))

module.exports = {
    name: `infractions`,
    description: `Voir les avertissements d'un membre.`,
    execute(client, message, args) {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`Vous n'avez pas la permission d'utiliser cette commande.`)
        let user = message.mentions.members.first()
        if(!user) return message.channel.send(`Veuillez mentionner un membre à avertir.`)
        let embed = new Discord.MessageEmbed()
        .setTitle(`Avertissement de l'utilisateur :`)
        .addField("Nombre d'avertissement :", warns[user.user.id].length)
        .setDescription(warns[user.user.id] && warns[user.user.id].length ? warns[user.user.id].slice().map(e => "**Raison :**\n" + e.reason + "\n**Modérateur :**\n<@" + e.mod + ">\n") : "Cet utilisateur n'a aucun avertissement.")
        .setTimestamp()

        message.channel.send(embed)
        message.delete();
    }
}