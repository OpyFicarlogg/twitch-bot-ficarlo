import { AbstractMessage } from "dto/abstractMessage";
import { ChatUserstate, Client } from "tmi.js";

export default class Clear extends AbstractMessage {
    
    public constructor(){
        super();
        super.msgName = 'clear';
    }

    public async execute(client : Client, channel : string, tags : ChatUserstate, message: string , self : boolean) : Promise<void> {
        if(tags.username == process.env.TWITCH_USERNAME?.toLowerCase()){
            client.clear(`${process.env.TWITCH_CHANNEL}`);
        }     
    }
}

