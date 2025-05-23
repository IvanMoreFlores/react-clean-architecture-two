import { AxiosError } from "axios";
import api from "../application/services/api";
import { ErrorResponse } from "../domain/entities/response-error.entity";
import { LoginResponseSuccess } from "../domain/entities/login-response-success.entity";
import { LoginRepository } from "../domain/repositories/login.repositories";

export class LoginApi implements LoginRepository {
  login(
    email: string,
    password: string
  ): () => Promise<LoginResponseSuccess | ErrorResponse> {
    const url = "/auth/login";
    return async () => {
      try {
        const response = await api.post(url, { username: email, password });
        return { response: response.data, status: response.status };
      } catch (error) {
        if (error instanceof AxiosError) {
          const status = error.response?.status ?? 500;
          const errorData: { message: string } =
            typeof error.response?.data === "object" &&
            error.response?.data &&
            "message" in error.response.data
              ? error.response.data
              : { message: "Unknown error" };

          return { error: errorData, status };
        }
        return {
          error: { message: "An unexpected error occurred" },
          status: 500,
        };
      }
    };
  }
}
