import { getModelForClass } from "@typegoose/typegoose";
import { User } from "dto/User";
import {Client} from "tmi.js";
import { HydratedDocument } from "mongoose";
import { IJoinService } from "./interfaces/IJoinService";
import { injectable } from "inversify";

@injectable()
export class MongoJoinService implements IJoinService {

    private  userModel;

    constructor(){
        this.userModel = getModelForClass(User);
    }

    public async execute (client : Client, channel: string, username : string, self : boolean) : Promise<void> {

        var user : HydratedDocument<User>| null  = await this.userModel.findByUsername(username);
  
        // Si l'user n'existe pas, ou qu'il existe et qu'il n'est pas ban
        if(!self){
            if(!user){
              client.say(channel, `Première fois sur le stream, bienvenue @${username}!`);
              console.log(`${username} first first`);      
            }
            else if  (!user.bot) {
              client.say(channel, `Bienvenue @${username}!`);
              console.log(`${username} join`); 
            }
            else {
              console.log(`${username} is bot`);
            }
        
            this.userModel.addOrUpdateUser(user,username);
        }
    }
}