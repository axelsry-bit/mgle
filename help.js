const Discord = require('discord.js')
const prefix = require('../config.json').prefix

module.exports = {
    name: `help`,
    description: `Envoyer toutes les commandes disponibles.`,
    execute(client, message, args) {
        let embed = new Discord.MessageEmbed()
        .setTitle(`Commandes`)
        .addField("Modération", `> **${prefix}ban** Permet de bannir un membre.\n> **${prefix}infractions** Voir les avertissements d'un membre.\n> **${prefix}kick** Permet d'expulser un membre.\n> **${prefix}mute** Rendre un utilisateur muet.\n> **${prefix}unban** Révoque le bannissement d'un membre.\n> **${prefix}unmute** Rendre la voix à un utilisateur.\n> **${prefix}unwarn** Supprimer le dernier avertissement d'un membre.\n> **${prefix}warn** Avertir un membre.\n> **${prefix}clear** Supprimer un certains nombre de messages.\n> **${prefix}name** Permet de modifier le nom du bot avec celui du serveur.\n> **${prefix}logo** Permet de modifier la pp du bot avec celle du serveur.`)
        .addField("Autre", `> **${prefix}say** Faire parler le bot.\n> **${prefix}info** Affiche des informations sur le bot.\n> **${prefix}suggest** Permet d'apporter des suggestions constructives au serveur.`)
        .setColor('#fdfdfd')
        message.author.send(embed)
        message.delete();
        let user = message.mentions.members.first()
        if(!user) return message.reply(` la page d'aide vous a été envoyée en privé !`)
        
    }
}