import { injectable } from "inversify";
import { ChatUserstate, Client } from "tmi.js";
import { ToLoad } from "./toLoad";

@injectable()
export abstract class AbstractMessage implements ToLoad {
    protected msgName: string = '';

    public getName(){
        return this.msgName;
    }

    abstract execute(client : Client, channel : string, tags : ChatUserstate, message: string , self : boolean ) : Promise<void>
}