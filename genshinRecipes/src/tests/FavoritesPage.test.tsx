import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, test, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import FavoritesPage from '../pages/FavoritesPage.tsx';

vi.mock('../utils/globalFunctions', () => ({
  changeFavoriteState: vi.fn(),
  getFavoriteState: vi.fn(),
}));

const mockPush = vi.fn();

vi.mock('@hooks/useNavigation', () => {
  return {
    default: () => ({
      push: mockPush,
    }),
  };
});
describe('RecipesPage.tsx snapshot test', () => {
  test('matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <FavoritesPage />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
