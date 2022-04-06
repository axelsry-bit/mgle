const Discord = require('discord.js')

module.exports = {
    name: `logo`,
    description: `Permet de modifier la pp du bot avec celle du serveur.`,
    execute(client, message, args) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Vous n'avez pas la permission d'utiliser cette commande !`)
        client.user.setAvatar(message.guild.iconURL())
        let embed = new Discord.MessageEmbed()
        .setTitle(`Mise à jour`)
        .addField("")
        .setDescription(" > La pp du serveur a été appliquer au bot.")
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL())
        message.channel.send(embed)
        message.delete();
    }
    
}
