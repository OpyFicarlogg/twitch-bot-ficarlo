import {prop } from '@typegoose/typegoose';

export class UserConnection {
    constructor(date : Date){
        this.date = date;
    }

    @prop({ required: true })
    public date!: Date;
}
