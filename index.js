const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs');
client.commands = new Discord.Collection();
const config = require('./config.json')
const prefix = require('./config.json').prefix
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const cooldowns = new Discord.Collection();
const channel = JSON.parse(fs.readFileSync(`./channels.json`));
const welcome = require("./welcome");


const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);   
    client.commands.set(command.name, command);
    console.log(command.name + ` oppérationel.`)
}


client.on('ready', msg => {
  console.log(`Statistiques globales : \n\nLe bot a un total de ${client.guilds.cache.size} serveurs. \nPour un total de ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} membres.`);

  welcome(client);
});

client.once('ready', () => {
  const statuses = [
    () => `${client.guilds.cache.size} serveurs`,
    () => `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} membres`,
    () => `${prefix}help pour page d'aide`,
    () => `chilling with owner`
  ]
  let i = 0
  setInterval(() => {
    client.user.setActivity(statuses[i](), {type: 'STREAMING', url: 'https://www.twitch.tv/axl_sry'})
    i = ++i % statuses.length
  }, 1e4)
})

//Vous lui demandez de lire tout les messages envoyés
client.on('message', async message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(config.prefix)) return;
    if(!message.guild) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    client.commands.get(command).execute(client, message, args)
})


function includesRealy(msg, str){
  return (
    msg.content.includes(str) ||
    msg.content.includes(str.toUpperCase()) ||
    msg.content.includes(str.toLowerCase())
  )
}

client.on('message', message =>{
  if (message.content.startsWith("Astro") || message.content.startsWith("astro") || message.content.startsWith("A S T R O.✞#3130")) {
      message.send    
      const exampleEmbed = new Discord.MessageEmbed()
      .setDescription('Le plus bg de tout les bg tu peux pas test.')
      message.channel.send(exampleEmbed);
      console.log('répond à astro');

  }
});

 
client.on('message', message => {
  if(includesRealy(message, "discord.gg") || includesRealy(message, "discord.com/invite") || includesRealy(message, "https://") || includesRealy(message, "http://") || includesRealy(message, "www.") && channel[message.channel.id].blocked === true) {
    message.delete()
  }
})

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
  if (!prefixRegex.test(message.content)) return;
  
  const [, matchedPrefix] = message.content.match(prefixRegex);
  
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  
  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
  
  if (!command) return;
  
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }
  
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);    const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
  
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000
            return message.reply(
        `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
      );      }
  }
  
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  
    try {
      command.execute(client, message, args);
    } catch (error) {
      console.error(error);
      message.reply("There was an error executing that command.").catch(console.error);
    }
  });
      
client.login(process.env.token) ;