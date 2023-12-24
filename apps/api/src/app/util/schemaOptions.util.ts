import { SchemaOptions } from 'mongoose';

/**
 * The default schema options to use for all schemas.
 * Gets rid of the __V and id fields, and enables getters and virtuals when converting to JSON or object.
 */
export const defaultSchemaOptions: SchemaOptions = {
    toJSON: { getters: true, virtuals: true, versionKey: false },
    toObject: { getters: true, virtuals: true, versionKey: false },
    id: false,
};
