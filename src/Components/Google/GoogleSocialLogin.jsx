import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";

const clientId =
  "826244010992-sbb8v32dj2ncq3r1jc5e1sd21lmf4idg.apps.googleusercontent.com";

const GoogleSocialLogin = () => {
  const [flag, setFlag] = useState(false);
  const [name, setName] = useState();

  const handleSucess = (res) => {
    console.log("handleSucess ----------> ", res);
    setName(res.profileObject["name"]);
    console.log("Sucess ----------> ", res.profileObject);
    setFlag(true);
  };
  const handleFailure = (res) => {
    console.log("handleFailure ---> ", res);
  };

  const handleLogout = () => {
    // console.log("handleFailure ---> ", res);
    setFlag(false);
  };

  return (
    <div>
      <h3>GoogleLogin</h3>
      {flag ? (
        <>
          <h5>Welcome to Google, {name} </h5>
          <GoogleLogout
            clientId="YOUR_CLIENT_ID"
            buttonText="Logout"
            onLogoutSuccess={handleLogout}
          />
        </>
      ) : (
        <GoogleLogin
          clientId={clientId}
          onSuccess={handleSucess}
          onFailure={handleFailure}
          buttonText="Login"
          cookiePolicy="single_host_origin"
          isSignedIn={false}
        />
      )}
    </div>
  );
};

export default GoogleSocialLogin;
