import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { userEvent } from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/Navbar.tsx";
import HomePage from "../pages/HomePage.tsx";

describe("NavBar.tsx snapshot test", () => {
    test('matches snapshot', () => {
        const { asFragment } = render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});

describe("NavBar navigation testing", () => {

    test("Check to see if NavBar will navigate to HomePage.tsx when 'The Wanmin Restaurant' is clicked.", async () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
              <NavBar />
              <Routes>
                <Route path="/" element={<HomePage />} />
              </Routes>
            </MemoryRouter>
          );
        const wanminLink = screen.getByText('The Wanmin Restaurant'); // Find the link with text 'Recipes'
        expect(wanminLink).toBeInTheDocument(); // Ensure it's in the document

        await userEvent.click(wanminLink);
        expect(screen.getByText("The Wanmin Restaurant")).toBeInTheDocument();
})
})