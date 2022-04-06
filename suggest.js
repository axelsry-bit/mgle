const Discord = require('discord.js')
const prefix = require('../config.json').prefix

module.exports = {
    name: `suggest`,
    description: `Permet de faire une suggestion constructive pour le serveur.`,
    execute(client, message, args) {
        let content = args.slice(0).join(" ")
        if(!content) return message.channel.send(`Usage de la commande :\n\ ${prefix}suggest [Suggestion]`)
        let channel = message.guild.channels.cache.find(ch => ch.name === "💡・suggestions")
        if(!channel) return message.channel.send(`Je n'ai pas réussi à trouver le salon des suggestions. Veuillez mentionner Astro afin que le problème soit résolu.`)
        channel.send(new Discord.MessageEmbed()
        .setTitle(`Suggestion`)
        .setDescription(content)
        .addField("Proposé par", message.author.tag)).then(msg => {
            msg.react(`✅`)
            msg.react(`⚪`)
            msg.react(`❌`)
            message.channel.send(`Votre suggestion a bien été envoyé !`)
            message.delete();
        })
    }
}