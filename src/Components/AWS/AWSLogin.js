import React, { useState, useContext } from "react";
import UserPool from "./UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { AccountContext } from "./AwsAccounts";
import { signIn, getCurrentUser, currentSession} from "aws-amplify/auth";

const AwsLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { authenticate } = useContext(AccountContext);

  const handleSignIn = async (event) => {
    event.preventDefault();
    // AWS Cognito integration using Amplify
    try {
      const siginInResponse = await signIn({ username: email, password });
      console.log("Signed In!", siginInResponse);

      const user = await getCurrentUser();
      console.log("getCurrentUser ---------------->>>>>>>>> ", user);

      const accessToken = user.signInUserSession.accessToken.jwtToken;
      const refreshToken = user.signInUserSession.refreshToken.token;

      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);


    } catch (error) {
      console.error("Failed to login: ", error);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    authenticate(email, password)
      .then((data) => {
        console.log("Logged In!", data);
      })
      .catch((err) => {
        console.error("Failed to login: ", err);
      });

    // const user = new CognitoUser({
    //   Username: email,
    //   Pool: UserPool,
    // });
    // const authenticationDetails = new AuthenticationDetails({
    //   Username: email,
    //   Password: password,
    // });

    // user.authenticateUser(authenticationDetails, {
    //   onSuccess: (data) => {
    //     console.log("OnSucess: ", data);
    //   },
    //   onFailure: (err) => {
    //     console.error("OnFailure: ", err);
    //   },
    //   newPasswordRequired: (data) => {
    //     console.log("NewPasswordRequired: ", data);
    //   },
    // });
  };
  return (
    <div>
      <h3>AWS Login</h3>
      <form onSubmit={handleSignIn}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AwsLogin;
