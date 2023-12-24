import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserWithId } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    /**
     * Finds a user by name or throws an error if no user is found.
     * @param name - The name of the user to find.
     * @returns A promise that resolves to the found user.
     * @throws Error if no user is found with the specified name.
     */
    async findByNameOrThrow(name: string): Promise<UserWithId> {
        const user = await this.userModel.findOne({ name }).exec();

        if (!user) {
            throw new Error(`No user found with name ${name}`);
        }

        return user.toObject();
    }
}
