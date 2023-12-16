import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
//import { DegreeRequirements } from "./DegreeReqs";

test("renders the course name somewhere", () => {
    render(<App />);
    const linkElement = screen.getByText(/UD Course Planner/i);
    expect(linkElement).toBeInTheDocument();
});

test("should render the modal when modalIsOpen is true", () => {
    render(<App />);
    const modalElement = screen.queryByText("Getting Started:");
    expect(modalElement).toBeInTheDocument();
});

test("should render the 'Need Help?' button", () => {
    render(<App />);
    const buttonElement = screen.getByText("Need Help?");
    expect(buttonElement).toBeInTheDocument();
});

test("'Need Help?' button opens modal on click", () => {
    render(<App />);
    const buttonElement = screen.getByText(/Need Help?/i);
    fireEvent.click(buttonElement);
    expect(screen.getByText(/Getting Started:/i)).toBeInTheDocument();
});

test("opens and closes the modal", () => {
    render(<App />);
    const openModalBtn = screen.getByText(/Need Help?/i);
    // Open modal
    fireEvent.click(openModalBtn);
    const modalContent = screen.getByText(/Getting Started/i);
    expect(modalContent).toBeInTheDocument();
    // Close modal
    const closeModalBtn = screen.getByText(/×/i);
    fireEvent.click(closeModalBtn);
    expect(modalContent).not.toBeInTheDocument();
});
