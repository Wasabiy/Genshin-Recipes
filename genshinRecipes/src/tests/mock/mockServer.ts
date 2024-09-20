import { setupServer } from 'msw/node';
import { apiHandlers } from './apiHandler';

export const server = setupServer(...apiHandlers);
