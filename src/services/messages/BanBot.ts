import { getModelForClass } from "@typegoose/typegoose";
import { AbstractMessage } from "dto/abstractMessage";
import { User } from "dto/User";
import { ChatUserstate, Client } from "tmi.js";

export default class Bot extends AbstractMessage {
    
    private  userModel;
    
    public constructor(){
        super();
        super.msgName = 'banbot';
        this.userModel = getModelForClass(User);
    }

    public async execute(client : Client, channel : string, tags : ChatUserstate, message: string , self : boolean) : Promise<void> {
        const args = message.split(' ').slice(1);
        
        if(tags.username == process.env.TWITCH_USERNAME?.toLowerCase() && await this.userModel.banUser(args[0])) {
            client.say(channel, `Plus de notifications pour l'utilisateur: ${args[0]}`);
          }
          else{
            client.say(channel,'Impossible d\'exécuter la commande');
          }
    }
}

