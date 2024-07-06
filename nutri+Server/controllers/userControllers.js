import { serverResponse } from "../utils/serverResponse.js";
import { hashPassword } from "../utils/passwordHashing.js";
import { compareHashedPassword } from "../utils/compareHashedPasswords.js";
import {
  getAllUsersService,
  getUserByUsername,
  createUserService,
} from "../services/userServices.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersService();
    serverResponse(res, 200, users);
  } catch (error) {
    serverResponse(res, 500, error);
  }
};

export const createUser = async (req, res) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;
    const hashedPassword = hashPassword(password);
    const user = await createUserService({ username, password: hashedPassword, email: req.body.email });
    serverResponse(res, 201, user);
  } catch (error) {
    serverResponse(res, 500, error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);

    if (!user) {
      return serverResponse(res, 404, "User not found");
    }

    if (user.password === undefined) {
      return serverResponse(res, 500, "Password not found for user");
    }

    const isValidPassword = compareHashedPassword(password, user.password);

    if (isValidPassword) {
      
      return serverResponse(res, 200, user);
    } else {
      return serverResponse(res, 401, "Invalid password");
    }
  } catch (error) {
    console.error("Error in loginUser:", error);
    return serverResponse(res, 500, error.message);
  }
};
