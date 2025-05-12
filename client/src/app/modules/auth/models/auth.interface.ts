export interface UserRegistration {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthState {
  loading: boolean;
  user: any | null;
  error: string | null;
  success: boolean;
}

export interface SendOtpResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
  };
}
export interface OtpPayload {
  email: string;
  otp: string;
}
export interface UserLogin {
  email: string;
  password: string;
}
