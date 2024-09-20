import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, expect, test, beforeAll, vi } from "vitest";
import { server } from "./mockServer.ts"
import { KeyFood, Type } from "../models/interface.ts";
import RecipeCard from "../components/RecipeCard.tsx";
import RecipesPage from "../pages/RecipesPage.tsx";
import RecipeInfoPage from "../pages/RecipeInfoPage.tsx"
import { changeFavoriteState, getFavoriteState } from "../utils/globalFunctions.ts";
import { MemoryRouter, BrowserRouter as Routes, Route } from "react-router-dom";

vi.mock("../utils/globalFunctions", () => ({
    changeFavoriteState: vi.fn(),
    getFavoriteState: vi.fn(),
}));

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("RecipesPage.tsx snapshot test", () => {
    test('matches snapshot', () => {
        const { asFragment } = render(
            <MemoryRouter>
                <RecipesPage />
            </MemoryRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});

/*describe("RecipesPage.tsx sorting function", () => {

})
*/

