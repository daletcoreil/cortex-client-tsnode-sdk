export * from './authApi';
import { AuthApi } from './authApi';
export * from './jobTypesApi';
import { JobTypesApi } from './jobTypesApi';
export * from './jobsApi';
import { JobsApi } from './jobsApi';
import * as http from 'http';

export class HttpError extends Error {
    constructor (public response: http.IncomingMessage, public body: any, public statusCode?: number) {
        super('HTTP request failed');
        this.name = 'HttpError';
    }
}

export { RequestFile } from '../model/models';

export const APIS = [AuthApi, JobTypesApi, JobsApi];
