require('dotenv').config();
const tmi = require('tmi.js');

const client = new tmi.Client({
  options: { debug: true, messagesLogLevel: "info" },
  connection: {
    secure: true,
    reconnect: true
  },
  // Lack of the identity tags makes the bot anonymous and able to fetch messages from the channel
  // for reading, supervision, spying, or viewing purposes only   
  channels: [`${process.env.TWITCH_CHANNEL}`]
});

client.connect();

client.on('message', (channel, tags, message, self) => {
  console.log(`${tags['display-name']}: ${message}`);
});