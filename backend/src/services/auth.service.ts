import bcrypt from "bcryptjs";
import { users, User } from "../data/data";
import { generateToken } from "../utils/jwt.utils";

export class AuthService {
  static async register(email: string, password: string, name: string) {
    // Check if user exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser: User = {
      id: `user_${Date.now()}`,
      email,
      password: hashedPassword,
      name,
      createdAt: Date.now(),
    };

    users.push(newUser);

    // Generate token
    const token = generateToken(newUser.id);

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
      token,
    };
  }

  static async login(email: string, password: string) {
    // Find user
    const user = users.find((u) => u.email === email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    // Generate token
    const token = generateToken(user.id);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }
}
