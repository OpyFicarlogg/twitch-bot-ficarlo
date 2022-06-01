import { AbstractMessage } from "dto/abstractMessage";
import { ChatUserstate, Client } from "tmi.js";

export default class CustomCommand extends AbstractMessage {
    
    public constructor(){
        super();
        super.msgName = 'addCommand';
    }


    //TODO: pouvoir changer le message via une commande ? 
    //TODO: Faire une commande qui permet d'ajouter une commande qui retourne du texte 
    // stocké ça en json ? ou mongo DB ? 
    public async execute(client : Client, channel : string, tags : ChatUserstate, message: string , self : boolean) : Promise<void> {
        client.say(channel, 'Not implemented');
    }
}

