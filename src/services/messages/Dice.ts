import { AbstractMessage } from "dto/abstractMessage";
import { ChatUserstate, Client } from "tmi.js";

export default class Dice extends AbstractMessage {
    
    public constructor(){
        super();
        super.msgName = 'dice';
    }

    public async execute(client : Client, channel : string, tags : ChatUserstate, message: string , self : boolean) : Promise<void> {
        const result = Math.floor(Math.random() * 6) + 1;
        client.say(channel, `@${tags.username}, Le résultat est ${result}`);
    }
}

