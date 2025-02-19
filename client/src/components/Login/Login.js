import React, { useState } from "react";
import axios from "axios";
import "./Login.scss";
import { getBaseURL } from "../apiConfig";
import TokenRefresher from "../Utils/token"; 

function Login(props) {
  let [uname, setUname] = useState("");
  let [password, setPass] = useState("");
  let [error, setError] = useState("");

  // Adding click handler
  function handleClick() {
    if (validateInputs()) {
      const user = {
        companyName: uname,
        password: password,
      };
      let url = `http://localhost:8747/api/auth/login`;
      const config = {
        headers:{
          'Content-Type': 'application/json'
        }
      }
      const body = JSON.stringify(user)
      axios
        .post(url,body,config)
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            console.log("Logged in successfully");
            sessionStorage.setItem("isUserAuthenticated", true);
            /* const user = res.data[0].isAdmin; */
            /* sessionStorage.setItem("customerId", res.data[0].userId);
            sessionStorage.setItem("isAdmin", user ? true : false); */
            localStorage.setItem("jwt_token", res.data.token);
            const token = localStorage.getItem('token')
            axios.defaults.headers.common['x-auth-token'] = token
            /* sessionStorage.setItem("jwt_refresh_token", res.data[0].refreshToken); */
            /* TokenRefresher(res.data[0].refreshToken); */
            /* props.setUserAuthenticatedStatus(user ? true : false, res.data[0].userId);
             */
          } else {
            console.log("User not available");
          }

          window.location.href = "/Landing"
        })
        .catch((err) => {
          console.log(err);
          delete axios.defaults.headers.common['x-auth-token']
          console.log("error");
        });
    }
  }

  // Function to validate email format
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Function to validate password length
  function validatePassword(password) {
    return password.length >= 6;
  }

  // Function to validate inputs
  function validateInputs() {
    if (uname == "") {
      setError("Please provide a valid name.");
      return false;
    } else if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    setError("");
    return true;
  }

  // Function to handle changes in email input
  function changeName(event) {
    setUname(event.target.value);
  }

  // Function to handle changes in password input
  function changePass(event) {
    setPass(event.target.value);
  }

  return (
    <>
      <div className="login-container">
        <h1>Login</h1>
        <div>
          <label>Company Name</label>
          <input type="text" value={uname} onChange={changeName}></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={changePass}
          ></input>
        </div>
        {error && <div className="error-message">{error}</div>}
        <button onClick={handleClick}>Login</button>
        <div className="register-link" onClick={() => props.navigateToRegisterPage()}>
          Is New User
        </div>
      </div>
    </>
  );
}

export default Login;
