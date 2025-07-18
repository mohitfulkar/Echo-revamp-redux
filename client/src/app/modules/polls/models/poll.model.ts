export interface Option {
  _id: string;
  text: string;
  voteCount: number;
}

export interface Question {
  _id: string;
  text: string;
  type: "single" | "multiple";
  isRequired: boolean;
  options: Option[];
}

export interface PollData {
  _id: string;
  title: string;
  description: string;
  expiryDate: string;
  isPublic: boolean;
  createdBy: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  questions: Question[];
}
