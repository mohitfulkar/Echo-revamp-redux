import { User } from "../model/User.js"; // Import your
import jwt from "jsonwebtoken";
import { Panelist } from "./../model/Panelists.js";

export const authService = {
  register: async (payload) => {
    try {
      const { email } = payload;
      let user = await User.findOne({ email });
      if (user) {
        return {
          status: 400,
          message: "Email already registered",
        };
      }

      // Save user based on type
      let newUser = new User(payload);
      await newUser.save();
      return {
        status: 201,
        message: "User registered successfully",
        result: {
          id: newUser._id,
        },
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  login: async (payload, userType) => {
    const { email, password, fullName, secretKey } = payload;
    let token;

    switch (userType) {
      case "panelist":
        // Check if fullName and secretKey are provided for panelist
        if (!fullName || !secretKey) {
          throw new Error("Full name and secret key are required for panelist");
        }
        

        // Find panelist by full name
        const panelist = await Panelist.findOne({ fullName });
        if (!panelist) {
          throw new Error("Panelist not found");
        }

        // Check if the secret key matches
        if (secretKey !== panelist.secretKey) {
          throw new Error("Invalid secret key");
        }

        // Generate JWT token for panelist
        token = jwt.sign(
          { id: panelist._id, fullName: panelist.fullName },
          process.env.PANELIST_JWT_SECRET, // Ensure PANELIST_JWT_SECRET is in your environment variables
          { expiresIn: "1h" }
        );

        return {
          message: "Panelist login successful",
          token,
          panelist: { id: panelist._id, fullName: panelist.fullName },
        };

      case "user":
        if (!email || !password) {
          throw new Error("Email and password are required for user");
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Invalid email or password");
        }

        // Check if the plain text password matches
        if (password !== user.password) {
          throw new Error("Invalid password");
        }

        // Generate JWT token for user
        token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET, // Ensure JWT_SECRET is in your environment variables
          { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
        );

        return {
          message: "User login successful",
          token,
          user: { id: user._id, email: user.email, user_type: user.user_type },
        };

      default:
        throw new Error("Invalid user type");
    }
  },
};

export default authService;
