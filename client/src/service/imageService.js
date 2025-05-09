import { baseUrl } from "../constants/env.js";
const default_photo = "5856.jpg";

export const getPhotoUrl = (photoPath) => {
  console.log("photoPath", photoPath);
  if (!photoPath) return `${baseUrl}/uploads/${default_photo}`; // Provide a default image
  return `${baseUrl}/uploads/${photoPath}`;
};
