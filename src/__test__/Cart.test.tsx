import { render, fireEvent, screen } from "@testing-library/react";
import Cart from "../components/Cart";

describe("Cart component", () => {
    it("renders without crashing", () => {
        render(<Cart />);
    });

    it("adds an item to the cart", () => {
        render(<Cart />);
        const addBtns = screen.getAllByRole("button", { name: "+" });
        fireEvent.click(addBtns[0]);
        const itemCountText = screen.getByTestId("total-items");
        expect(itemCountText.textContent).toBe("Total Items:1");
    });

    it("removes an item from the cart", () => {
        render(<Cart />);
        const addBtns = screen.getAllByRole("button", { name: "+" });
        fireEvent.click(addBtns[0]);
        const removeBtns = screen.getAllByRole("button", { name: "-" });
        fireEvent.click(removeBtns[0]);
        const itemCountText = screen.getByTestId("total-items");
        expect(itemCountText.textContent).toBe("Total Items:0");
    });

    it("deletes an item from the cart", () => {
        render(<Cart />);
        const removeBtns = screen.getAllByRole("button", { name: "Delete" });
        fireEvent.click(removeBtns[0]);
        const deletedItemText = screen.queryByText("Product 1");
        expect(deletedItemText).not.toBeInTheDocument();
    });

    it("refreshes the cart", () => {
        render(<Cart />);
        fireEvent.click(screen.getByTestId("refresh-btn"));
        const itemCountText = screen.getByTestId("total-items");
        expect(itemCountText.textContent).toBe("Total Items:0");
    });

    it("recycles the cart", () => {
        render(<Cart />);
        fireEvent.click(screen.getByTestId("recycle-btn"));
        const itemCountText = screen.queryByText("1");
        expect(itemCountText).not.toBeInTheDocument();
    });
});
