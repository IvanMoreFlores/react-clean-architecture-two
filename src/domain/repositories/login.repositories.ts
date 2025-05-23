import { LoginResponseSuccess } from "../entities/login-response-success.entity";
import { ErrorResponse } from "../entities/response-error.entity";
export interface LoginRepository {
  login(
    email: string,
    password: string
  ): () => Promise<LoginResponseSuccess | ErrorResponse>;
}
