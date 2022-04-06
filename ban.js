const Discord = require('discord.js')
const client = new Discord.Client()
module.exports = {
    name: `ban`,
    description: `Permet de bannir un membre.`,
    execute(client, message, args) {
        if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`Vous n'avez pas la permission d'utiliser cette commande !`)
        let user = message.mentions.members.first()
        let raison = args.slice(0).join(" ")
        if(!user || !raison) return message.channel.send(`Usage de la commande :\n\`.ban @Utilisateur Raison\``)
        if(user.user.id === message.guild.ownerID) return message.channel.send(`Vous ne pouvez pas bannir le créateur du serveur !`)
        if(user.user.id === "416593143765401600" || user.user.id === "706302538106011678") return message.channel.send(`Ce membre ne peut pas être bannis.`)
        if(user.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Vous ne pouvez pas bannir une personne ayant un rôle supérieur au votre !`)
        if(!user.bannable) return message.channel.send(`Je ne peux pas bannir ce membre.`)
        user.ban({ reason: raison }).then(() => {
            message.channel.send(new Discord.MessageEmbed()
            .setTitle(`Bannissement`)
            .setDescription(`${user.user.tag} a été bannis du serveur par ${message.author}`)
            .addField("Raison", raison)
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp()
            .setColor("ec7063"))
            message.delete();
        })
    }
}