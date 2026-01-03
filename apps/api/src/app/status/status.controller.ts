import { Controller, Get, Logger } from '@nestjs/common';
import { awakeAnswer } from '@retter/api-interfaces';

@Controller('status')
export class StatusController {
    private readonly _log = new Logger(StatusController.name);

    /**
     * Wakes up the server.
     */
    @Get('/')
    async wakeUpServer(): Promise<awakeAnswer> {
        return { awake: true } as awakeAnswer;
    }
}
