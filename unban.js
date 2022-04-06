const Discord = require('discord.js')

module.exports = {
    name: 'unban',
    description: 'Révoque le bannissement d\'un membre.',
    execute(client, message, args) {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`Vous n'avez pas la permission d'utiliser cette commande !`)
        let id = args[0]
        if(!id) return message.channel.send(`Utilisation de la commande : \`.unban [ID du membre]\``)
        if(isNaN(id)) return message.channel.send(`Veuillez entrer un id valide.`)
        message.guild.members.unban(id).then(() => {
            message.channel.send(`Membre débanni.`)
            message.delete();
        })
    }
}