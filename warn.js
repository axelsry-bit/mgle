const Discord = require('discord.js')
const fs = require('fs')
const warns = JSON.parse(fs.readFileSync('./warns.json'))

module.exports = {
    name: `warn`,
    description: `Avertir un membre.`,
    execute(client, message, args) {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`Vous n'avez pas la permission d'utiliser cette commande.`)
        let user = message.mentions.members.first()
        if(!user) return message.channel.send(`Veuillez mentionner un membre à avertir.`)
        if(user.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.ownerID) return message.channel.send(`Vous ne pouvez pas avertir ce membre.`)
        let reason = args.slice(1).join(" ");
        if (!reason) return message.channel.send("Veuillez indiquer la raison de l'avertissement.");
        if (!warns[user.user.id]) {
            warns[user.user.id] = [];
        }
        warns[user.user.id].unshift({
            reason: reason,
            date: Date.now(),
            mod: message.author.id
        });
        fs.writeFileSync("./warns.json", JSON.stringify(warns));
        message.channel.send(new Discord.MessageEmbed()
        .setTitle(`Avertissement !`)
        .setDescription(`${user.user} a été averti par ${message.author}`)
        .addField('Raison', reason)
        .setTimestamp())
        message.delete();
    }
}