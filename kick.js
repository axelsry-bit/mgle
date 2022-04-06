const Discord = require('discord.js')

module.exports = {
    name: `kick`,
    description: `Permet d'expulser un membre.`,
    execute(client, message, args) {
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`Vous n'avez pas la permission d'utiliser cette commande !`)
        let user = message.mentions.members.first()
        let raison = args.slice(0).join(" ")
        if(!user || !raison) return message.channel.send(`Usage de la commande :\n\`.kick @Utilisateur Raison\``)
        if(user.user.id === message.guild.ownerID) return message.channel.send(`Vous ne pouvez pas expulser le créateur du serveur !`)
        if(user.user.id === "416593143765401600" || user.user.id === "706302538106011678") return message.channel.send(`Ce membre ne peut pas être expulsé.`)
        if(user.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Vous ne pouvez pas expulser une personne ayant un rôle supérieur au votre !`)
        if(!user.kickable) return message.channel.send(`Je ne peux pas expulser ce membre.`)
        user.kick(raison).then(() => {
            message.channel.send(new Discord.MessageEmbed()
            .setTitle(`Expulsion`)
            .setDescription(`${user.user.tag} a été expulsé du serveur par ${message.author}`)
            .addField("Raison", raison)
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp()
            .setColor("ec7063"))
        })
        message.delete();
    }
}