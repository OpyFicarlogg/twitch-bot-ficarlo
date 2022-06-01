import { User } from "dto/User";
import { HydratedDocument } from "mongoose";

export interface IUserDao {

    getOne(username: string) : Promise<HydratedDocument<User>| null >;

    addOrUpdate(user: HydratedDocument<User>| null,username: string) :  Promise<HydratedDocument<User>| null> ;
}
