import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, expect, test, beforeAll, vi } from "vitest";
import { server } from "./mock/mockServer.ts"
import { KeyFood, Type } from "../models/interface";
import RecipeCard from "../components/RecipeCard";
import { changeFavoriteState, getFavoriteState } from "../utils/globalFunctions";
import { MemoryRouter } from "react-router-dom";

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

const mockFood: KeyFood = {
    key: "sweet-madame",
    name: "Sweet Madame",
    rarity: 2,
    type: Type.RecoveryDish,
    effect: "Restores 20~24% of Max HP and an additional 900~1,500 HP to the selected character.",
    hasRecipe: true,
    description: "Honey-roasted fowl. The honey and sweet flowers come together to compliment the tender fowl meat.",
    proficiency: 10,
    recipe: [],
  };

const mockSrc:string = `https://genshin.jmp.blue/consumables/food/${mockFood.key}`;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("RecipeCard.tsx snapshot test", () => {
    test('matches snapshot', () => {
        const { asFragment } = render(
            <MemoryRouter>
                <RecipeCard food={mockFood} src={mockSrc} />
            </MemoryRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});

describe('testing RecipeCard functionalities', () => {

        test('Check if isLiked state changes' , () => {
        const { getByRole } = render(
            <MemoryRouter>
                <RecipeCard food={mockFood} src={mockSrc} />
            </MemoryRouter>
        );

        const button = getByRole('button');

        fireEvent.click(button);
        expect(button).toHaveClass('likedButton');
        expect(changeFavoriteState).toHaveBeenCalledWith(mockFood);

        getFavoriteState.mockReturnValueOnce(true);
        fireEvent.click(button);
        expect(button).toHaveClass('normalButton');
        expect(changeFavoriteState).toHaveBeenCalledTimes(2);
    })

       test('Check if clicking on a card leads to RecipeInfoPage.tsx', async () => {
            render(<RecipeCard food={mockFood} src={mockSrc} />, {
                    wrapper: ({children}) => (
                      <MemoryRouter initialEntries={["/"]}>
                        {children}
                      </MemoryRouter>
                    ),
                  }
            );

            const cardSquares = (screen.getByRole('link', { name: /sweet madame/i }));
            fireEvent.click(cardSquares);
            expect(screen.getByText('Sweet Madame')).toBeTruthy();
        })

});