import logo from "./logo.svg";
import "./App.css";
import GoogleLogin from "./Components/Google/GoogleSocialLogin";
import GoogleOAuth2Login from "./Components/Google/GoogleOAuth2Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
// import AwsSignup from "./Components/AWS/AwsSignup";
// import AwsLogin from "./Components/AWS/AWSLogin";
import { AwsAccounts } from "./Components/AWS/AwsAccounts";
// import AwsStatus from "./Components/AWS/AwsStatus";

const clientId =
  "826244010992-sbb8v32dj2ncq3r1jc5e1sd21lmf4idg.apps.googleusercontent.com";

function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId={clientId}>
        <AwsAccounts>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <GoogleLogin />
            <GoogleOAuth2Login />
            {/* <AwsStatus /> */}
            {/* <AwsSignup /> */}
            {/* <AwsLogin /> */}
          </header>
        </AwsAccounts>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
