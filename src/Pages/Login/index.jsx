import React from 'react';
import { useOktaAuth } from '@okta/okta-react';

function Loggedin() {
  return <div data-testid="logged-in" />;
}

function Login() {
  const { oktaAuth, authState } = useOktaAuth();

  const login = async () => oktaAuth.signInWithRedirect();

  if (!authState) {
    return <p>Loading...</p>;
  }
  if (!authState.isAuthenticated) {
    login();
  }

  return <Loggedin />;
}

export default Login;
