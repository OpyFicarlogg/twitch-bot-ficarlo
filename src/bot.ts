require('dotenv').config();
import {Client} from "tmi.js";
import { myContainer } from "config/inversify.config";
import { TYPES } from "config/types";
import { Loader } from "config/loader";
import { IJoinService } from "services/interfaces/IJoinService";
import { AbstractMessage } from "dto/abstractMessage";
import { IDatabase } from "services/interfaces/IDatabase";

let messages = new Map<string,AbstractMessage>();

const loader = myContainer.get<Loader>(Loader);
const mongodb : IDatabase = myContainer.get<IDatabase>(TYPES.IDatabase);
const joinService : IJoinService = myContainer.get<IJoinService>(TYPES.IJoinService);

messages = loader.loadMessages();
mongodb.connect();



const client = new Client({
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

client.on("join", async  (channel, username, self) => {
  joinService.execute(client,channel,username,self);
});


client.on('message', async (channel, tags, message, self) => {

  if(self || !message.startsWith('!')) {
    return;
  }

  const args = message.slice(1).split(' ');
  const command = args.shift()!.toLowerCase();

	if(messages.get(command)){
		messages.get(command)?.execute(client , channel , tags , message , self);
	}
});
