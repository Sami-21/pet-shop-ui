import { setActivePinia, createPinia } from "pinia";
import { describe, test, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import { AuthState } from "@/types/authState.type";
// import { useCookies } from "vue3-cookies";
import { User } from "@/types/user.type";
import { useSnackbarStore } from "@/stores/snackbarStore";

vi.mock("axios");
// vi.mock("vue3-cookies", () => {
//   return {
//     useCookies: vi.fn(() => ({
//       set: vi.fn(),
//       get: vi.fn(),
//       remove: vi.fn(),
//     })),
//   };
// });

describe("Auth Store", () => {
  let authStore: ReturnType<typeof useAuthStore>;
  //   let cookieMock: any;
  const initialState: AuthState = {
    user: null,
    token: "",
    orders: [],
    totalOrders: 0,
    error: null,
    errors: [],
    isLoading: false,
  };
  beforeEach(() => {
    setActivePinia(createPinia());
    // cookieMock = useCookies();
    authStore = useAuthStore();
  });

  test("Auth store initialized", () => {
    expect(authStore == initialState);
  });

  test("Auth store reset", () => {
    expect(authStore == initialState);
  });

  test("Auth store reset errors", () => {
    expect(authStore.error == null);
  });

  test("Login with success", async () => {
    const responseData = {
      success: 1,
      data: {
        token: "mock-token",
      },
    };

    (axios.post as any).mockResolvedValueOnce({ data: responseData });

    const result = await authStore.login("test@example.com", "password");

    expect(authStore.isLoading).toBe(false);
    expect(authStore.token).toBe("mock-token");
    expect(result).toEqual(responseData);
    expect(result.success).toBe(1);
    // expect(cookieMock.set).toHaveBeenCalledWith("token", "mock-token");
  });

  test("Login error ", async () => {
    const errorResponse = {
      response: {
        success: 0,
        data: {
          error: "error message",
          errors: { email: "Email is required" },
        },
      },
    };

    (axios.post as any).mockRejectedValueOnce(errorResponse);

    try {
      await authStore.login("test@example.com", "wrongpassword");
    } catch (error: any) {
      expect(authStore.isLoading).toBe(false);
      expect(authStore.error).toBe("error message");
      expect(authStore.errors).toEqual({ email: "Email is required" });
      expect(error.response.success).toBe(0);
      expect(error).toEqual(errorResponse);
    }
  });

  test("Create user account with success", async () => {
    const user: User = {
      first_name: "test",
      last_name: "test",
      email: "test@email.com",
      phone_number: "+123 456 789",
      address: "test address",
      avatar: "test-test-test-test",
      created_at: "test date",
      is_marketing: false,
      updated_at: "test date",
      uuid: "test-test-test-test",
    };
    const responseData = {
      success: 1,
      data: {
        token: "mock-token",
        ...user,
      },
    };
    (axios.post as any).mockResolvedValueOnce({ data: responseData });

    const result = await authStore.create({
      first_name: "test",
      last_name: "test",
      email: "test@email.com",
      phone_number: "+123 456 789",
      address: "test address",
      avatar: "test-test-test-test",
      password: "password",
      password_confirmation: "password",
    });

    expect(authStore.isLoading).toBe(false);
    expect(authStore.token).toBe("mock-token");
    expect(authStore.user).toStrictEqual(user);
    expect(result.success).toBe(1);
    expect(result).toEqual(responseData);
    //   expect(cookieMock.set).toHaveBeenCalledWith('token', 'mock-token');
  });

  test("Create user account error", async () => {
    const errorResponse = {
      response: {
        success: 0,
        data: {
          error: "error message",
          errors: { email: "Email is already taken" },
        },
      },
    };
    (axios.post as any).mockRejectedValueOnce(errorResponse);

    try {
      await authStore.create({
        first_name: "test",
        last_name: "test",
        email: "test@email.com",
        phone_number: "+123 456 789",
        address: "test address",
        avatar: "test-test-test-test",
        password: "password",
        password_confirmation: "password",
      });
    } catch (error: any) {
      expect(authStore.isLoading).toBe(false);
      expect(authStore.error).toBe("error message");
      expect(authStore.errors).toEqual({ email: "Email is already taken" });
      expect(error.response.success).toBe(0);
      expect(error).toEqual(errorResponse);
    }
  });

  test("Logout user with success", async () => {
    const snackbarStore = useSnackbarStore();
    const responseData = {
      success: 1,
    };
    (axios.get as any).mockResolvedValueOnce({ data: responseData });

    const result = await authStore.logout();

    expect(authStore.isLoading).toBe(false);
    expect(authStore.token).toBe("");
    expect(authStore.user).toBe(null);
    expect(snackbarStore.isVisible).toBe(true);
    expect(snackbarStore.message).toEqual("Logout success");
    expect(snackbarStore.color).toEqual("success");
    expect(result.success).toBe(1);
    expect(result).toEqual(responseData);
    //   expect(cookieMock.set).toHaveBeenCalledWith('token', '');
  });

  test("Logout user error", async () => {
    const snackbarStore = useSnackbarStore();
    const errorResponse = {
      response: {
        success: 0,
        data: {
          error: "Logout error",
        },
      },
    };
    (axios.get as any).mockRejectedValueOnce(errorResponse);

    try {
      await authStore.logout();
    } catch (error: any) {
      expect(authStore.isLoading).toBe(false);
      expect(authStore.error).toBe("Logout error");
      expect(snackbarStore.isVisible).toBe(true);
      expect(snackbarStore.message).toEqual("Logout error");
      expect(snackbarStore.color).toEqual("error");
      expect(error.response.success).toBe(0);
      expect(error).toEqual(errorResponse);
    }
  });

  test("Get user with success", async () => {
    const user: User = {
      first_name: "test",
      last_name: "test",
      email: "test@email.com",
      phone_number: "+123 456 789",
      address: "test address",
      avatar: "test-test-test-test",
      created_at: "test date",
      is_marketing: false,
      updated_at: "test date",
      uuid: "test-test-test-test",
    };
    const responseData = {
      success: 1,
      data: {
        ...user,
      },
    };
    (axios.get as any).mockResolvedValueOnce({ data: responseData });

    const result = await authStore.getUserData();

    expect(authStore.isLoading).toBe(false);
    expect(authStore.user).toEqual(user);
    expect(result).toEqual(responseData);
  });

  test("Get user error", async () => {
    const snackbarStore = useSnackbarStore();
    const errorResponse = {
      response: {
        success: 0,
        data: {
          error: "Error occured while fetching user data",
        },
      },
    };
    (axios.get as any).mockRejectedValueOnce(errorResponse);

    try {
      await authStore.getUserData();
    } catch (error: any) {
      expect(authStore.isLoading).toBe(false);
      expect(authStore.error).toBe("Error occured while fetching user data");
      expect(snackbarStore.isVisible).toBe(true);
      expect(snackbarStore.message).toEqual(
        "Error occured while fetching user data"
      );
      expect(snackbarStore.color).toEqual("error");
      expect(error.response.success).toBe(0);
      expect(error).toEqual(errorResponse);
    }
  });
});
