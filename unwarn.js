const Discord = require('discord.js')
const fs = require('fs')
const warns = JSON.parse(fs.readFileSync('./warns.json'))

module.exports = {
    name: `unwarn`,
    description: `Supprimer le dernier avertissement d'un membre.`,
    execute(client, message, args) {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`Vous n'avez pas la permission d'utiliser cette commande.`)
        let user = message.mentions.members.first()
        if(!user) return message.channel.send(`Veuillez mentionner le membre dont vous voulez supprimer l'avertissement.`)
        if (!warns[user.user.id]) {
            warns[user.user.id] = [];
            return message.channel.send(`Ce membre n'a aucun avertissement.`)
        }
        warns[user.user.id].shift();
        fs.writeFileSync("./warns.json", JSON.stringify(warns));
        message.channel.send(new Discord.MessageEmbed()
        .setTitle(`Avertissement supprimé !`)
        .setDescription(`Le dernier avertissement de ${user.user} a été retiré par ${message.author}`)
        .setTimestamp())
        message.delete();
    }
}