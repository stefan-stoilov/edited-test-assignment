import user from "@testing-library/user-event";
import { screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render } from "vitest-browser-react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../context";
import { Form } from ".";
import { formData } from "../../data/form";
import { errorMessages } from "../../models";

describe("Form Test", () => {
  const renderForm = () => {
    render(<Form />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/"]}>
          <AuthProvider>{children}</AuthProvider>
        </MemoryRouter>
      ),
    });
  };

  beforeEach(() => {
    vi.fn().mockClear();
    renderForm();
  });

  it("Should render with correct data.", () => {
    Object.values(formData).forEach((value) => {
      if (typeof value === "string") {
        expect(screen.getByText(value)).toBeInTheDocument();
      } else {
        Object.values(value).forEach((nestedValue) => {
          expect(screen.getByText(nestedValue)).toBeInTheDocument();
        });
      }
    });
  });

  it("Should display validation error for invalid email.", async () => {
    fireEvent(
      screen.getByPlaceholderText(formData.placeholders.username),
      new Event("input", { bubbles: true })
    );
    user.type(
      screen.getByPlaceholderText(formData.placeholders.password),
      "Test1234"
    );
    user.click(screen.getByText(formData.loginLabel));

    await waitFor(() => {
      expect(screen.getByText(errorMessages.username)).toBeInTheDocument();
    });
  });

  it("Should display validation error for password with insufficient length.", async () => {
    await user.type(
      screen.getByPlaceholderText(formData.placeholders.username),
      "test@test.com"
    );
    await user.type(
      screen.getByPlaceholderText(formData.placeholders.password),
      "1234"
    );
    await user.click(screen.getByText(formData.loginLabel));

    await waitFor(() => {
      expect(
        screen.getByText(errorMessages.password.minLength)
      ).toBeInTheDocument();
    });
  });

  it("Should display validation error for password without a letter but with sufficient length.", async () => {
    await user.type(
      screen.getByPlaceholderText(formData.placeholders.username),
      "test@test.com"
    );
    await user.type(
      screen.getByPlaceholderText(formData.placeholders.password),
      "123456"
    );
    await user.click(screen.getByText(formData.loginLabel));

    expect(screen.getByText(errorMessages.password.regex)).toBeInTheDocument();
  });
});
