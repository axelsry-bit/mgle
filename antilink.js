const fs = require('fs')
const channel = JSON.parse(fs.readFileSync('./channels.json'))

module.exports = {
  name: `anti-link`,
  description: `Active / désactive l'anti-link dans un salon`,
  execute(client, message, args) {
    if(!channel[message.channel.id]) {
      channel[message.channel.id] = {
        blocked: true
      }
      fs.writeFile('./channels.json', JSON.stringify(channel, null, 4), err => { if(err) console.log(err) })
      message.channel.send(`Anti-link activé`)
    } else if(channel[message.channel.id].blocked === true) {
      channel[message.channel.id] = {
        blocked: false
      }
      fs.writeFile('./channels.json', JSON.stringify(channel, null, 4), err => { if(err) console.log(err) })
      message.channel.send(`Anti-link désactivé`)
    } else if(channel[message.channel.id].blocked === false) {
      channel[message.channel.id] = {
        blocked: true
      }
      fs.writeFile('./channels.json', JSON.stringify(channel, null, 4), err => { if(err) console.log(err) })
      message.channel.send(`Anti-link activé`)
    }
  }
}