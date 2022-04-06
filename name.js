const Discord = require('discord.js')

module.exports = {
    name: `name`,
    description: `Permet de modifier le nom du bot avec celui du serveur.`,
    execute(client, message, args) {
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`Vous n'avez pas la permission d'utiliser cette commande !`)
        client.user.setUsername(message.guild.name)
        let embed = new Discord.MessageEmbed()
        .setTitle(`Mise à jour`)
        .addField("")
        .setDescription(" > Le nom du serveur a été appliquer au bot.")
        .setTimestamp()
        .setFooter(message.guild.name, message.guild.iconURL())
        message.channel.send(embed)
        message.delete();
    }
}
