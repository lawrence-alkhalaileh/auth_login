import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  username: string;
}

export async function getUserNameLocalStorage() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Cannot find token");
  const decode = jwtDecode(token);
  //   console.log(decode);
  return decode as CustomJwtPayload;
}
