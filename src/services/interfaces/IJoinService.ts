import { Client } from "tmi.js";

export interface IJoinService {

    execute(client : Client, channel: string, username : string, self : boolean) : void;
}
