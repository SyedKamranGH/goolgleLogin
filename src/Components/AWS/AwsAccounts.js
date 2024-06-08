import React, { createContext } from "react";
import Pool from "./UserPool";
// import { signIn } from "aws-amplify/auth";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

const AccountContext = createContext();

const AwsAccounts = (props) => {
  
  const getSessions = async () => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject();
          } else {
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  };

  // const handleSignIn = async (Username, Password) => {
  //   // event.preventDefault();
  //   // AWS Cognito integration using Amplify

  //   console.log(Username, Password);
  //   return await new Promise((resolve, reject) => {
  //     signIn({ Username, Password })
  //       .then((siginInResponse) => {
  //         console.log("Signed In!", siginInResponse);
  //         resolve(siginInResponse);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         reject(err);
  //       });
  //   });
  // };

  const authenticate = async (Username, Password) => {
    // handleSignIn(Username, Password);
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool,
      });
      const authenticationDetails = new AuthenticationDetails({
        Username,
        Password,
      });

      user.authenticateUser(authenticationDetails, {
        onSuccess: (data) => {
          console.log("OnSucess: ", data);
          resolve(data);
        },
        onFailure: (err) => {
          console.error("OnFailure: ", err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log("NewPasswordRequired: ", data);
          resolve(data);
        },
      });
    });
  };

  const logout = () => {
    const user = Pool.getCurrentUser();
    user.signOut();
  };
  return (
    <AccountContext.Provider value={{ authenticate, getSessions, logout }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { AwsAccounts, AccountContext };
