import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, expect, test, beforeAll, vi } from "vitest";
import { server } from "./mock/mockServer.ts"
import { KeyFood, Type } from "../models/interface";
import RecipeCard from "../components/RecipeCard";
import { changeFavoriteState, getFavoriteState } from "../utils/globalFunctions";
import { MemoryRouter } from "react-router-dom";
import FavoritesPage from "../pages/FavoritesPage.tsx";

vi.mock("../utils/globalFunctions", () => ({
    changeFavoriteState: vi.fn(),
    getFavoriteState: vi.fn(),
}));

const mockPush = vi.fn();

vi.mock("@hooks/useNavigation", () => {
  return {
    default: () => ({
      push: mockPush,
    }),
  };
});
describe("RecipesPage.tsx snapshot test", () => {
    test('matches snapshot', () => {
        const { asFragment } = render(
            <MemoryRouter>
                <FavoritesPage />
            </MemoryRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});