import axios from "axios";

//const apiUrl = "http://localhost:5000/api/";

interface User {
  username: string;
  email: string;
  password: string;
}

interface loginUser {
  email: string;
  password: string;
}

// register the user service
export const registerUser = async (user: User) => {
  try {
    const response = await axios.post("user/register", user);
    return response.data;
  } catch (error) {
    return error;
  }
};

// login the user service
export const loginUser = async (user: loginUser) => {
  try {
    const response = await axios.post("user/login", user);
    return response.data;
  } catch (error) {
    return error;
  }
};

// login the user service
export const userTasks = async (user: loginUser) => {
  try {
    const response = await axios.post("tasks/findByUser", user);
    return response.data;
  } catch (error) {
    return error;
  }
};