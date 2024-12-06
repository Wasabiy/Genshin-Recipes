import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, test, beforeAll, vi } from 'vitest';
import { server } from './mock/mockServer.ts';
import RecipesPage from '../pages/RecipesPage.tsx';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../utils/globalFunctions', () => ({
  changeFavoriteState: vi.fn(),
  getFavoriteState: vi.fn(),
  getFavorites: vi.fn(),
}));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('RecipesPage.tsx snapshot test', () => {
  test('matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <RecipesPage />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
