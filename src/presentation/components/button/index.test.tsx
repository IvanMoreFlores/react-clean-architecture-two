import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./index";

describe("Button Component", () => {
  //Primer test
  it("Given a Button, when rendered, then it should contain the provided text", () => {
    // Arrange
    render(<Button text="Click me" />);
    // Assert
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument(); // Verifica que el botón contenga el texto proporcionado
  });

  //Segundo test
  it("Given a Button, when clicked, then onClick should be called", () => {
    // Arrange
    const handleClick = jest.fn();
    render(<Button text="Click" onClick={handleClick} />);
    // Act
    fireEvent.click(screen.getByRole("button", { name: /click/i }));
    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1); // Verifica que se haya llamado la función handleClick
  });

  //Tercer test
  it("Given a Button, when rendered, then it should have the provided styles", () => {
    // Arrange
    render(
      <Button
        text="Styled"
        backgroundColor="#123456"
        color="#ffffff"
        borderColor="#ff0000"
      />
    );
    // Act
    const button = screen.getByRole("button", { name: /styled/i }); // Verifica que el botón tenga los estilos proporcionados
    // Assert
    expect(button).toHaveStyle({
      backgroundColor: "#123456",
      color: "#ffffff",
      border: "1px solid #ff0000",
    }); // Verifica que el botón tenga los estilos proporcionados
  });
});
