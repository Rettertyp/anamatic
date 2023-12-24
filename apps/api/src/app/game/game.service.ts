import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { checkWordConsistsOfChars } from '@retter/util';
import { Game, GameDocument } from './game.schema';
import { Model, Types } from 'mongoose';
import { RequestUser } from '../user/user.schema';
import { GameIdDto } from '@retter/api-interfaces';

@Injectable()
export class GameService {
    constructor(@InjectModel(Game.name) private readonly gameModel: Model<Game>) {}

    /**
     * Retrieves all games associated with a user.
     * @param user - The user object.
     * @returns A promise that resolves to an array of GameDocument objects.
     */
    async findAll(user: RequestUser): Promise<GameDocument[]> {
        return this.gameModel.find({ user: user._id }).exec();
    }

    /**
     * Retrieves a game by id.
     * @param user - The user object.
     * @param id - The id of the game.
     * @returns A promise that resolves to the GameDocument object.
     */
    async findByIdOrThrow(user: RequestUser, gameId: string): Promise<GameDocument> {
        const game = await this.gameModel.findById(gameId).exec();

        if (!game) {
            throw new NotFoundException(`No game found with id ${gameId}`);
        }

        this.checkBelongsToUserOrThrow(user, game);

        return game;
    }

    /**
     * Creates a game.
     * @param user - The user object.
     * @param characters - The characters that the user has to use to make words.
     * @returns A promise that resolves to the created GameDocument object.
     */
    async create(user: RequestUser, characters: string[]): Promise<GameIdDto> {
        try {
            const game = new this.gameModel({ user: user._id, characters, words: [] });
            await game.save();
            return { _id: game._id.toString() };
        } catch (error) {
            throw new BadRequestException(`The game does not fit the schema!`);
        }
    }

    /**
     * Deletes a game.
     * @param user - The user object.
     * @param id - The id of the game.
     * @returns A promise that resolves when the game is deleted.
     */
    async delete(user: RequestUser, gameId: string): Promise<void> {
        // delete the game
        const deletedGame = await this.gameModel
            .findOneAndDelete({ _id: new Types.ObjectId(gameId), user: user._id })
            .exec();

        if (!deletedGame) {
            throw new NotFoundException(`No game found with id ${gameId}`);
        }
    }

    /**
     * Adds a word to a game.
     * @param user - The user object.
     * @param id - The id of the game.
     * @param wordDto - The word to add to the game.
     * @returns A promise that resolves to the updated GameDocument object.
     */
    async addWord(user: RequestUser, gameId: string, word: string, points: number): Promise<void> {
        const game = await this.findByIdOrThrow(user, gameId);

        // check if the word is already in the game
        if (game.words.some((entry) => entry.word === word)) {
            throw new BadRequestException(`Word ${word} is already in the game.`);
        }

        // check if the word can be made with the characters
        if (!checkWordConsistsOfChars(word, game.characters)) {
            throw new BadRequestException(`Word ${word} cannot be made with the characters of the game.`);
        }

        // add the word to the game
        game.words.push({ word, points });
        game.totalScore += points;

        await game.save();
    }

    /**
     * Checks if a game belongs to a specific user.
     * @param user - The user object.
     * @param game - The game object.
     * @returns True if the game belongs to the user, false otherwise.
     */
    private checkBelongsToUserOrThrow(user: RequestUser, game: GameDocument): void {
        if (!game.user.equals(user._id)) {
            throw new UnauthorizedException(`Game with id ${game._id} does not belong to user ${user.name}`);
        }
    }
}
