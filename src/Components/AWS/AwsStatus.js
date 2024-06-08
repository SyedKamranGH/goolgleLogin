import React, { useState, useContext, useEffect } from "react";
import { AccountContext } from "./AwsAccounts";
import { signOut } from "aws-amplify/auth";
import {
  getCurrentUser,
  fetchAuthSession,
  fetchUserAttributes,
} from "aws-amplify/auth";

import { Auth } from "aws-amplify";

const AwsStatus = () => {
  const [status, setStatus] = useState(false);

  const { getSessions, logout } = useContext(AccountContext);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  const handleCurrentSession = async () => {
    try {
      const user = await getCurrentUser();
      console.log("user -----> ", user);
      const session = await fetchAuthSession();
      console.log("session -----> ", session);
      const userAttributes = await fetchUserAttributes();
      console.log("userAttributes -----------> ", userAttributes);

      Auth.currentSession.then((res) => {
        let accessToken = res.getAccessToken();
        console.log(`myAccessToken: ${JSON.stringify(accessToken)}`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSessions().then((session) => {
      console.log(" session:", session);
      setStatus(true);
    });

    handleCurrentSession();
  }, []);
  return (
    <div>
      {/* Logged in */}
      {/* {status ? ( */}
      <>
        You are Logged in
        <button onClick={() => handleLogout()}>Logout</button>
      </>
      {/* ) : (
        "Please Login"
      )} */}
    </div>
  );
};

export default AwsStatus;
