import { setupServer } from 'msw/node';
import { apiHandlers } from './mock/apiHandler';

export const server = setupServer(...apiHandlers);