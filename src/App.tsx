import React from 'react';

// context
import AuthState from 'context/auth/AuthState';
import AppState from 'context/app/AppState';

// components
import Navigation from 'components/Navigation';

function App() {
  return (
    <AuthState>
      <AppState>
        <Navigation />
      </AppState>
    </AuthState>
  );
}

export default App;
