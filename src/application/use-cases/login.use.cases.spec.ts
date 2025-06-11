import { LoginRepository } from "../../domain/repositories/login.repositories";
import { LoginUseCases } from "./login.use.cases";

describe("LoginUseCases", () => {
  let loginRepository: LoginRepository;
  let loginUseCases: LoginUseCases;

  beforeEach(() => {
    loginRepository = {
      login: jest.fn(),
    } as unknown as LoginRepository;
    loginUseCases = new LoginUseCases(loginRepository);
  });

  it("Given a LoginUseCases, when created, then it should be defined", () => {
    //Assert
    expect(loginUseCases).toBeDefined(); // Verifica que loginUseCases esté definido
  });

  it("Given a LoginUseCases, when login is called, then loginRepository.login should be called", async () => {
    // Arrange
    const email = "email";
    const password = "password";
    // Act
    await loginUseCases.login(email, password);
    // Assert
    expect(loginRepository.login).toHaveBeenCalledWith(email, password); // Verifica que loginRepository.login haya sido llamado con los argumentos correctos
  });
});
