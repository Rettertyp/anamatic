import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { defaultSchemaOptions } from '../util/schemaOptions.util';
import { HydratedDocument, Types } from 'mongoose';

@Schema(defaultSchemaOptions)
export class User {
    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: String, required: true })
    passwordHash: string;
}

export type UserDocument = HydratedDocument<User>;

export type UserWithId = User & { _id: string };

export type PublicUser = Pick<User, 'name'> & {
    _id: string;
};

export type RequestUser = Pick<User, 'name'> & {
    _id: Types.ObjectId;
};

export const UserSchema = SchemaFactory.createForClass(User);
