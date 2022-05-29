/* eslint-disable */

import axios from "axios";
import { showAlert } from "./alerts";
// Login:
export const login = async (email, password) => {
  try {
    
    console.log('hello');
    const res = await axios({
      method: "POST",
      url: "/api/user/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
// Signup:
export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/user/signup",
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === "success") {
      showAlert("success", "Signup successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    console.log(err.response);
    showAlert("error", err.response.data.message);
  }
};
// Logout:
export const logout = async () => {
  try {

    const res = await axios({
      method: "GET",
      url: "/api/user/logout",
      // url: "http://127.0.0.1:3000/api/user/logout",
    });
    
    if ((res.data.status = "success")) {
      location.reload(true);

      location.assign("/");
    }
  } catch (err) {
    
    console.log(err.response);
    showAlert("error", err.response.data.message);
  }
};