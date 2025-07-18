export interface PanelistData {
  name: string;
  email: string;
  contactNumber: string;
  occupation: string;
  expertise: string[];
  experience: number;
  contribution: string;
  publications: string;
  awards: string;
  category: {
    _id: string;
    name: string;
  };
  designation: string;
  assignedBy: string;
  linkedIn: string;
  twitter: string;
  github: string;
  website: string;
  otherSocialMedia: string;
  identityProof: string[];
  resume: string[];
  certification: string[];
  photo: string[];
  polls: any[];
}