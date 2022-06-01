import { Schema, Model, model, Types } from 'mongoose';

//TODO: à supprimer 
interface IUserConnection {
  _id: Types.ObjectId;
  title: string;
  }

  //https://mongoosejs.com/docs/typescript/schemas.html
  interface User {
    tags: Types.Array<string>,
    UserConnection: Types.DocumentArray<IUserConnection>
  }
  
  const userSchema = new Schema<User>({
    tags: [String],
    UserConnection: [{ title: String }]
  });

  const User = model<IUser>('User', userSchema);