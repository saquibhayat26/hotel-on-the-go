import { LoginFormData } from "../pages/Login";
import { RegisterFormData } from "../pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.status === 200) {
      const responseBody = await response.json();
      return responseBody;
    } else {
      await handleErrorMessage(response);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Something went wrong");
    } else {
      throw new Error("Something went wrong");
    }
  }
};

export const login = async (formData: LoginFormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.status === 200) {
      const responseBody = await response.json();
      return responseBody;
    } else {
      await handleErrorMessage(response);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || "Something went wrong");
    } else {
      throw new Error("Something went wrong");
    }
  }
};

const handleErrorMessage = async (errorResponse: Response) => {
  const errorBody = await errorResponse.json();
  const erroMessage = errorBody.message || "Something went wrong";

  switch (errorResponse.status) {
    case 400:
    case 401:
    case 404:
      throw new Error(erroMessage);
    default:
      throw new Error("Something went wrong");
  }
};
