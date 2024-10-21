import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { SALT_ROUNDS, JWT_SECRET_KEY } from "../config";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// register a new user
export const register = async (req: Request, res: Response) => {
  try {
    // get the user data from the request body
    const { username, email, password } = req.body;

    // check if user data is provided
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please provide all user details",
      });
    }

    // check if user already exists
    const user = await prisma.user.findFirst({ 
      where: { username : username}
    });
    if (user)
      return res.status(400).json({
        message: "User with this email already exists",
      });

      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hashedPassword
        }
      });

    return res.status(200).json({
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// login a user
export const login = async (req: Request, res: Response) => {
  try {
    // get the user data from the request body
    const { email, password } = req.body;

    // check if user data is provided
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide all user details",
      });
    }

    // check if user exists
    const user = await prisma.user.findFirst({ 
      where: { email }
    });

    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }

    // compare the password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // If the email and password are valid, return user data
    const token = jwt.sign(
      {id: user.id, username: user.username},
      JWT_SECRET_KEY,
      {expiresIn: "1h"}
    );
    res.cookie("access_token", token, {
      httpOnly: true,
      secure:process.env.NODE_ENV ===  "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60
    });
    return res.status(200).json({
      message: "User logged in successfully",
      /*user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },*/
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
