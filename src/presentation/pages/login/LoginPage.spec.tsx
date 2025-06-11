import { render } from "@testing-library/react";
import { screen, fireEvent, waitFor } from "@testing-library/dom";
import LoginPage from "./index";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/zustand/AuthStore";
import { LoginUseCases } from "../../../application/use-cases/login.use.cases";

jest.mock("react-router", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../store/zustand/AuthStore", () => ({
  useAuthStore: jest.fn(),
}));

jest.mock("../../../application/use-cases/login.use.cases", () => {
  return {
    LoginUseCases: jest.fn(() => ({
      login: jest.fn(() =>
        Promise.resolve({
          status: 200,
          response: {
            accessToken: "token",
            username: "username",
            image: "image",
          },
        })
      ),
    })),
  };
});

jest.mock("../../../insfrastructure/Login-api", () => {
  return {
    LoginApi: jest.fn(() => ({
      login: jest.fn(),
    })),
  };
});

describe("LoginPage", () => {
  const navigate = jest.fn();
  const setUser = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigate);
    (useAuthStore as unknown as jest.Mock).mockReturnValue({ setUser });
    localStorage.clear();
  });

  it("should render the login page", async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "emilys@gmail.com" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText("Login successful")).toBeInTheDocument();
      expect(setUser).toHaveBeenCalledWith("username");
      localStorage.setItem("token", "token");
      expect(navigate).toHaveBeenCalledWith("/home");
    });
  });

  it("should handle login failure", async () => {
    (LoginUseCases as jest.Mock).mockImplementationOnce(() => ({
      login: jest.fn(() => Promise.resolve({ status: 400 })),
    }));

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "emilys@gmail.com" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText("Login failed")).toBeInTheDocument();
    });
  });
});
