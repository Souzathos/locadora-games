import { AppError } from './AppError';

export class TooManyRequestsError extends AppError {

    constructor(message = 'Too Many Requests') {
        super(message, 429);
    }
}
