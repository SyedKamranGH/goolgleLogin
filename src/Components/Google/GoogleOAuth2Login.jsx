import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const GoogleOAuth2Login = () => {
  const handleSucess = (credentialResponse) => {
    console.log(credentialResponse);
    console.log(jwt_decode(credentialResponse.credential));
  };
  return (
    <div>
      GoogleOAuth2Login
      <GoogleLogin
        onSuccess={
          handleSucess
          //     (credentialResponse) => {
          //   console.log(credentialResponse);
          // }
        }
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default GoogleOAuth2Login;
