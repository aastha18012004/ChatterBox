import Messenger from "./components/Messenger";
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from "./context/AccountProvider";
import UserProvider from "./context/UserProvider";


function App() {

    const clientId = '464528607854-sdolrg1icruhp92cmtafp9lmso8jq6hl.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
        <UserProvider>
            <Messenger/>
        </UserProvider>
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
