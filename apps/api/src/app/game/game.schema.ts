import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { defaultSchemaOptions } from '../util/schemaOptions.util';
import { HydratedDocument, Types } from 'mongoose';

/**
 * Schema for a correct word. Only used as a nested schema.
 */
@Schema({ _id: false })
export class CorrectWord {
    /**
     * The word.
     */
    @Prop({ type: String, required: true })
    word: string;

    /**
     * The points of the word is worth.
     */
    @Prop({ type: Number, required: true, min: 0 })
    points: number;
}

/**
 * The schema for a game.
 */
@Schema(defaultSchemaOptions)
export class Game {
    /**
     * The user that the game belongs to.
     */
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;

    /**
     * The characters that the user has to use to make words.
     */
    @Prop({
        type: [String],
        required: true,
        validate: {
            validator: (v: string[]) => v.every((s) => s.length === 1),
            message: (props: { value: string }) => `${props.value} has a string with length != 1!`,
        },
        minlength: 1,
    })
    characters: string[];

    /**
     * The words that the user has made.
     */
    @Prop({
        type: [CorrectWord],
        default: [],
        // make sure there are no duplicate words
        validate: {
            validator: (v: CorrectWord[]) => v.length === new Set(v.map((w) => w.word)).size,
            message: 'CorrectWords contains duplicate words!',
        },
    })
    words: CorrectWord[];

    /**
     * The total score of the game.
     */
    @Prop({ type: Number, default: 0, min: 0 })
    totalScore: number;

    /**
     * The timestamp when the game was last played.
     * Automatically updated when the game is saved.
     */
    @Prop({ type: Date, default: Date.now })
    lastPlayed: Date;
}

export type GameDocument = HydratedDocument<Game>;

export const GameSchema = SchemaFactory.createForClass(Game);

// Middleware to update lastPlayed timestamp on save
GameSchema.pre('save', function (next) {
    this.lastPlayed = new Date();
    next();
});
