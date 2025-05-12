// src/core/service/TokenService.ts
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  email: string;
  iat?: number;
  exp?: number;
  [key: string]: any; // To allow extra fields
}

export const tokenService = {
  decodeToken: (token: string): DecodedToken | null => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded;
    } catch (error) {
      console.error("[TokenService] Invalid token", error);
      return null;
    }
  },
};
