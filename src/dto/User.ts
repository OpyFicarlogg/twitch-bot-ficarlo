import {modelOptions, prop, ReturnModelType } from '@typegoose/typegoose';
import { UserConnection } from './UserConnection';
import { HydratedDocument } from 'mongoose';

//https://dev.to/lioness100/youre-integrating-typescript-and-mongoose-wrong-1cdo
//https://typegoose.github.io/typegoose/docs/guides/quick-start-guide
@modelOptions({ schemaOptions: { collection: 'users' } })
export class User  {
    constructor(){
        this.userConnections = new Array<UserConnection>();
    }

    @prop({ required: true })
    public name!: string;

    @prop({ default: false })
    public bot?: boolean;

    //https://typegoose.github.io/typegoose/docs/guides/advanced/array-types/
    @prop({ type: UserConnection, required: false, default: [] })
    public userConnections: Array<UserConnection>; // This is a SubDocument Array
    //public userConnections: Types.Array<UserConnection>; // This is a SubDocument Array


    // the "this" definition is required to have the correct types
    public static async findByUsername(this: ReturnModelType<typeof User>, username: string) : Promise<HydratedDocument<User>| null >{
        return await this.findOne({name: username}).exec();
    }

    //https://stackoverflow.com/questions/7503450/how-do-you-turn-a-mongoose-document-into-a-plain-object
    //https://mongoosejs.com/docs/tutorials/lean.html
    //var user : User = await UserModel.findOne({name: username}).lean();
    public static async findByUsernameLean(this: ReturnModelType<typeof User>, username: string) : Promise<User>{
        return this.findOne({ name : username }).lean();
    }

    public static async truncateUsers(this: ReturnModelType<typeof User>) : Promise<void>{
        this.deleteMany({}, (err) => { 
            console.log("truncate table UserModel");          
        });
    }

    public static async addOne(this: ReturnModelType<typeof User>, username: string) : Promise<HydratedDocument<User>| null >{
        var localUser : User  = new User();
        localUser.name = username;
        localUser.userConnections.push(new UserConnection(new Date()));
      
        return this.create(localUser);
    }

    public static async addOrUpdate(this: ReturnModelType<typeof User>, username: string) : Promise<HydratedDocument<User>| null > {
        var user : HydratedDocument<User>| null  = await this.findOne({name: username}).exec();

        if(!user){
            var localUser : User  = new User();
            localUser.name = username;
            localUser.userConnections.push(new UserConnection(new Date()));
          
            return this.create(localUser);
        }
        else{
            //https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
            user.userConnections.push(new UserConnection(new Date()));
            return user.save();
        }   
    }

    public static async addOrUpdateUser(this: ReturnModelType<typeof User>, user: HydratedDocument<User>| null, username : string ): Promise<HydratedDocument<User>| null > {

        if(!user){
            var localUser : User  = new User();
            localUser.name = username;
            localUser.userConnections.push(new UserConnection(new Date()));
          
            return this.create(localUser);
        }
        else{
            //https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
            user.userConnections.push(new UserConnection(new Date()));
            return user.save();
        }   
    }

    public static async banUser(this: ReturnModelType<typeof User>, username: string) : Promise<boolean> {
        var user : HydratedDocument<User>| null  = await this.findOne({name: username}).exec();

        if(!user){
            return false
        }
        else{
            //https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose
            user.bot = true;
            user.save();
            return true;
        }   
    }

    public getNumberOfConnection() : number{
        return this.userConnections.length;
    }

}
