export const tokenService = {
  extractItems: (token) => {
    if (token) {
      try {
        // JWT structure: Header.Payload.Signature (split and decode payload)
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        return decodedToken;
      } catch (error) {
        console.error("Invalid token or decoding error:", error);
      }
    } else {
      console.log("No token found");
    }
  },

  removeToken: () => {
    localStorage.removeItem("token");
  },
};
