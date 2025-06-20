import axios from "axios";

interface registerUserCredentials {
  username: string;
  password: string;
  profile?: string;
  email: string;
}

interface UserData {
  username?: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  address?: string;
  profile?: string;
}

interface ApiResponse {
  data?: UserData;
  error?: unknown;
  msg?: string;
}

axios.defaults.baseURL = import.meta.env.VITE_API_SERVER_DOMAIN;

export async function authenticate(
  username: string
): Promise<{ status?: number; error?: string }> {
  try {
    const response = await axios.post("/api/authenticate", { username });
    return { status: response.status };
  } catch (error) {
    console.error(error);
    return { error: "Username doesn't exist...!" };
  }
}

export async function getUser({ username }: { username: string }) {
  try {
    const { data } = await axios.get(`/api/${username}`);
    return { data };
  } catch (error) {
    console.log(error);
    return { error: "Password doesn't match...!" };
  }
}

export async function registerUser(credentials: registerUserCredentials) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post("/api/register", credentials);

    const { username, email } = credentials;

    if (status == 201) {
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text: msg,
      });
    }
  } catch (error) {
    return Promise.reject({ error });
  }
}

export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  try {
    if (username) {
      const { data } = await axios.post("/api/login", { username, password });
      return { data };
    }
  } catch (error) {
    return { error, msg: "password does not match" };
  }
}

export async function updateUser(response: UserData): Promise<ApiResponse> {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.put("/api/updateUser", response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { data };
  } catch (error) {
    return { error, msg: "could not update profile" };
  }
}

export async function generateOTP(username: string) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/generateOTP", {
      params: { username },
    });

    if (status == 201) {
      const {
        data: { email },
      } = await getUser({ username });
      const text = `Your password recovery OTP is ${code}.`;
      await axios.post("/api/registerMail", {
        username,
        userEmail: email,
        text,
      });
    }
    return code;
  } catch (error) {
    return { error };
  }
}

export async function verifyOTP(username: string, code: number) {
  try {
    const { data, status } = await axios.get("/api/verifyOPT", {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return { error };
  }
}

export async function resetPassword(username: string, password: number) {
  try {
    const { data, status } = await axios.put("/api/resetPassword", {
      username,
      password,
    });
    return { data, status };
  } catch (error) {
    return { error };
  }
}
