import { getModelForClass } from "@typegoose/typegoose";
import { User } from "dto/User";
import { HydratedDocument } from "mongoose";
import { IUserDao } from "./interfaces/IUserDao";

export class UserDao implements IUserDao {
    //définir les méthodes d'accès aux classes ici 
    // Faire une interface pour pouvoir switch de dao si besoin 
    // Faire de l'injection de dépendance ? 
    private userModel;

    constructor(){
        this.userModel = getModelForClass(User);
    }

    public async getOne(username: string) : Promise<HydratedDocument<User>| null >{
        return await this.userModel.findByUsername(username);
    }

    public async addOrUpdate(user: HydratedDocument<User>| null,username: string) :  Promise<HydratedDocument<User>| null> {
        return await this.userModel.addOrUpdateUser(user,username);
    }
}
