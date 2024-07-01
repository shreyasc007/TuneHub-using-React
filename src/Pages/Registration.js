import React, { useState } from "react";
import axios from "axios";
import "../Styles/Registration.css";
axios.defaults.withCredentials = true;

export default function Registration() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");

  const handleNewUserData = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/register", {
        username: username,
        email: email,
        password: password,
        gender: gender,
        role: role,
        address: address,
      });

      console.log(response.data);

      if (response.data === "login") {
        alert("Registration Successful");
        window.location.href = "/login";
      } else {
        alert("User is already registered");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration");
    }
  };

  return (
    <div className="container">
      <img src="https://via.placeholder.com/60" alt="User Icon" />
      <form onSubmit={handleNewUserData}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="radio-group">
          <label>Gender:</label>
          <label>
            Male
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={(e) => setGender(e.target.value)}
            />
            <span className="custom-radio"></span>
          </label>
          <label>
            Female
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={(e) => setGender(e.target.value)}
            />
            <span className="custom-radio"></span>
          </label>
          <label>
            Other
            <input
              type="radio"
              name="gender"
              value="other"
              onChange={(e) => setGender(e.target.value)}
            />
            <span className="custom-radio"></span>
          </label>
        </div>

        <div className="radio-group">
          <label>Role:</label>
          <label>
            Admin
            <input
              type="radio"
              name="role"
              value="admin"
              onChange={(e) => setRole(e.target.value)}
            />
            <span className="custom-radio"></span>
          </label>
          <label>
            Customer
            <input
              type="radio"
              name="role"
              value="customer"
              onChange={(e) => setRole(e.target.value)}
            />
            <span className="custom-radio"></span>
          </label>
        </div>

        <textarea
          name="address"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>
        <input type="submit" value="Create Account" />
      </form>
    </div>

    // <div>
    //   <h2>Registration Form</h2>
    //   <form onSubmit={handleNewUserData}>
    //     <label>Username:</label>
    //     <br />
    //     <input
    //       type="text"
    //       name="username"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //     />
    //     <br />
    //     <br />
    //     <label>Email:</label>
    //     <br />
    //     <input
    //       type="email"
    //       name="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <br />
    //     <br />
    //     <label>Password:</label>
    //     <br />
    //     <input
    //       type="password"
    //       name="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <br />
    //     <br />
    //     <label>Gender:</label>
    //     <br />
    //     Male
    //     <input
    //       type="radio"
    //       name="gender"
    //       value="male"
    //       onChange={(e) => setGender(e.target.value)}
    //     />
    //     Female
    //     <input
    //       type="radio"
    //       name="gender"
    //       value="female"
    //       onChange={(e) => setGender(e.target.value)}
    //     />
    //     Other
    //     <input
    //       type="radio"
    //       name="gender"
    //       value="other"
    //       onChange={(e) => setGender(e.target.value)}
    //     />
    //     <br />
    //     <br />
    //     <label>Role:</label>
    //     <br />
    //     Admin
    //     <input
    //       type="radio"
    //       name="role"
    //       value="admin"
    //       onChange={(e) => setRole(e.target.value)}
    //     />
    //     Customer
    //     <input
    //       type="radio"
    //       name="role"
    //       value="customer"
    //       onChange={(e) => setRole(e.target.value)}
    //     />
    //     <br />
    //     <br />
    //     <label>Address:</label>
    //     <br />
    //     <textarea
    //       name="address"
    //       value={address}
    //       onChange={(e) => setAddress(e.target.value)}
    //     ></textarea>
    //     <br />
    //     <br />
    //     <input type="submit" value="submit" />
    //   </form>
    // </div>
  );
}
