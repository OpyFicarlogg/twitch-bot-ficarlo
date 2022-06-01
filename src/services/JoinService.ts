import { injectable } from "inversify";
import {Client} from "tmi.js";
import { IJoinService } from "./interfaces/IJoinService";

@injectable()
export class JoinService implements IJoinService {

    private currentDate : Date = new Date();
    private lstUser : string[] = [];

    constructor(){
    }

    public async execute (client : Client, channel: string, username : string, self : boolean) : Promise<void> {
        // Fonctionnement avec des variables temporaires 
        if(!self && !this.lstUser.includes(username)) {
            this.resetUserList();
            client.say(channel, `Bienvenue @${username}!`);
            this.lstUser.push(username);
  
        } 
    }

    private resetUserList() : void {
        var today : Date = new Date();
        if(this.currentDate.getDate() !== today.getDate()){
          this.currentDate = today;
          this.lstUser = [];
        }
      }
}