import React, { useState } from "react";
import UserPool from "./UserPool";
// import { Auth } from "aws-amplify";
import { signUp } from "aws-amplify/auth";

const AwsSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // AWS Cognito integration using Amplify
    try {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: email,
        password,
        options: { userAttributes: { email } },
      });

      console.log("HandleSubmit -----> ", userId);
    } catch (error) {
      console.error("error signing up ----> ", error);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    // AWS Cognito integration using Amplify

    // AWS Cognito integration
    UserPool.signUp(email, password, [], null, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  };
  return (
    <div>
      <h3>Aws Signup or Registration</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmalFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmalFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AwsSignup;
