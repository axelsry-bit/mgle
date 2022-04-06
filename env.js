const Discord = require('discord.js')

module.exports = {
    name: `env`,
    description: `Envoi un texte pré-défini.`,
    execute(client, message, args) {
        let embed = new Discord.MessageEmbed()
        .setTitle('Bienvenu(e) sur Prada |💎 ')
        .setDescription("> Pour accéder à la totalité du serveur clique sur la verification ci-dessous. \n  \n > Si la vérification ne fonctionne pas veuillez contacter : \n @A S T R O.✞#3130. \n \n")
        .setTimestamp()
        .setImage('https://cdn.discordapp.com/attachments/785280273578328064/790923801851330590/Captcha_google_checkbox.gif')
        message.channel.send(embed)
        message.delete();

    }
}
