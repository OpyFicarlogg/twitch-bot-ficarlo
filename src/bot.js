require('dotenv').config();
const tmi = require('tmi.js');

const client = new tmi.Client({
  options: { debug: true },
  connection: {
    secure: true,
    reconnect: true
  },
  identity: {
    username: `${process.env.TWITCH_USERNAME}`,
    password: `${process.env.TWITCH_OAUTH}`
  },
  channels: [`${process.env.TWITCH_CHANNEL}`]
});

client.connect();

client.on("join", (channel, username, self) => {

  //Stocker pour la journée pour ne pas être notifié une deuxième fois ? 
  //TODO: pouvoir changer le message via une commande ? 
  //TODO: définir une liste de user où ne pas notifier 
  if(!username.toLowerCase().includes("bot") && !self) {
    client.say(channel, `Bienvenue @${username}!`);
  }
  
});


client.on('message', (channel, tags, message, self) => {

  if(self || !message.startsWith('!')) {
    return;
  }

  //TODO: Faire une commande qui permet d'ajouter une commande qui retourne du texte 
  // stocké ça en json ? ou mongo DB ? 
  //TODO: faire le même système que pour le bot discord ? 
  const args = message.slice(1).split(' ');
  const command = args.shift().toLowerCase();

  switch(command){
    case 'clear':
      client.clear(`${process.env.TWITCH_CHANNEL}`);
      break;
    case 'echo':
      client.say(channel, `@${tags.username}, Tu as dis: "${args.join(' ')}"`);
      break;
    case 'hello': 
    client.say(channel, `@${tags.username}, Hey !`);
    break;
    case 'dé':
      const result = Math.floor(Math.random() * 6) + 1;
      client.say(channel, `@${tags.username}, Résultat du lancé : ${result}.`);
      break;
  }
});
