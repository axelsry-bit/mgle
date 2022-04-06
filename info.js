const Discord = require('discord.js')
const prefix = require('../config.json').prefix

module.exports = {
    name: `info`,
    description: `Affiche des informations à propos du bot..`,
    async execute(client, message, args) {
        let debut = Date.now();
        let user = client.users.fetch('691400952673992815');
        let mention = (await user).id
        let tag = (await user).tag
        let embed = new Discord.MessageEmbed()
        .setTitle(`Informations`)
        .addFields(
            { name: `Ping`, value: `Pong : ...`, inline: true },
            { name: `Créateur`, value: `[${tag} (@axlsry)](https://discord.gg/hsPYCVy7fW)`}
        )
        .setFooter(message.guild.name, message.guild.iconURL())
        await message.channel.send(embed).then(msg => {
            msg.edit(new Discord.MessageEmbed()
            .setTitle(`Informations`)
            .setImage('https://media.discordapp.net/attachments/785267213379567629/790933970958548992/gifanime.gif')
            .setDescription(`**Owner** \n > Créateur : <@${mention}> \n **Count** \n > Membres total : ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} \n **Servers** \n > Nombre de serveur : ${client.guilds.cache.size} \n **Prefix** \n > Mon préfix : ${prefix} \n **Salons** \n Nombre de salon: ${client.channels.cache.size} \n __`)
            .addFields(
                { name: `Ping`, value: ` > Pong : ${Date.now() - debut} ms`, inline: true },
                { name: `Créateur`, value: `[${tag} ](https://discord.gg/hsPYCVy7fW) [(@axlsry)](https://instagram.com/axlsry)`}
            )
            .setFooter(message.guild.name, message.guild.iconURL()))
        })
    }
}