import { AbstractMessage } from "dto/abstractMessage";
import { ChatUserstate, Client } from "tmi.js";

export default class Ping extends AbstractMessage {
    
    public constructor(){
        super();
        super.msgName = 'ping';
    }

    public async execute(client : Client, channel : string, tags : ChatUserstate, message: string , self : boolean) : Promise<void> {
        client.say(channel, `@${tags.username}, Pong !`);
    }
}

