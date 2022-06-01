import { injectable } from "inversify";
import { IDatabase } from "./interfaces/IDatabase";

@injectable()
export class MongoDb implements IDatabase{

    private mongoDbUrl : string = '';
    private mongoDbUser : string = '';
    private mongDbPassword : string = '';

    constructor(){
        if(process.env.MONGODB_URL){
            this.mongoDbUrl = process.env.MONGODB_URL;
        }
        else {
            console.log("MONGODB_URL is not set.")
        }

        if(process.env.MONGODB_USER && process.env.MONGODB_PASSWORD){
            this.mongoDbUser = process.env.MONGODB_USER;
            this.mongDbPassword = process.env.MONGODB_PASSWORD;
        }
        else {
            console.log("MONGODB_USER or/and MONGODB_PASSWORD is not set.")
        }
        

    }

    public connect () : void {

        if(this.mongoDbUrl && this.mongoDbUser && this.mongDbPassword)
        {
            // DB connection
            var mongoose = require("mongoose");

            mongoose.connect(this.mongoDbUrl, {
            auth: { "authSource": "admin" },
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            user: this.mongoDbUser,
            pass: this.mongDbPassword
            }).then(() => {
                //don't show the log when it is test
                if(process.env.NODE_ENV !== "test") {
                    console.log("Connected to %s", this.mongoDbUrl);
                }
            })
                .catch((err: any) => {
                    console.error("App starting error:", err.message);
                    process.exit(1);
                });
        }
        else {
            console.error("Impossible to connect to mongdb database, url, user or password is not set.")
        }        
    }
}
