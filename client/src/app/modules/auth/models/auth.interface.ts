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

export interface PanelistLogin {
  categoryId: string;
  email: string;
  password: string;
}

export interface AdminLogin {
  password: string;
}

export interface SocialMedia {
  linkedIn: string;
  twitter: string;
  github: string;
  website: string;
}

export interface Panelist {
  socialMedia: SocialMedia;
  _id: string;
  name: string;
  email: string;
  contactNumber: string;
  occupation: string;
  areaOfExpertise: string[];
  contributionSummary: string;
  excellenceRating: number;
  category: string;
  authorizedToCreatePolls: boolean;
  pollsCreated: any[]; // can specify more if you know the structure
  status: string;
  image: string;
  password: string;
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date
  __v: number;
}
