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
      showAlert("success", `Signup successfully! Welcome ${name}`);
      window.setTimeout(() => {
        location.assign("/overview");
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
    });
    
    if ((res.data.status = "success")) {
      location.reload(true);

      location.assign("/overview");
    }
  } catch (err) {
    
    console.log(err.response);
    showAlert("error", err.response.data.message);
  }
};

export const forgetPassword =  async(email)=>{
  try {
    const res = await axios({
        method: "POST",
      url: "api/user/forgotPassword",
      data: {
        email,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", `Password Reset Token sent to your email ${email}  successfully!`);
      window.setTimeout(() => {
        location.assign("https://mailtrap.io/inboxes");
      }, 600);
    }
  } catch (err) {
    console.log(err.response);
    showAlert("error", err.response.data.message);
  }
};