import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

/**
 * A pipe that validates that a given parameter is a valid MongoDB ObjectId.
 * @throws BadRequestException if the parameter is not a valid ObjectId
 */
@Injectable()
export class ObjectIdValidationPipe implements PipeTransform<string> {
    transform(value: string, metadata: ArgumentMetadata): string {
        if (metadata.type !== 'param') {
            return value; // Skip validation for non-route parameters
        }

        const isValidObjectId = Types.ObjectId.isValid(value);
        if (!isValidObjectId) {
            throw new BadRequestException(`Invalid ObjectId: ${value}`);
        }

        return value;
    }
}
