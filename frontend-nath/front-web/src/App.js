import React, {useEffect} from 'react';
import Routes from './Routes';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './theme';
import { logout } from './services/auth';




export default function App() {
  useEffect(() => {
    // logout();
}, [])

  return (
    <ThemeProvider theme={theme}>
      <Routes/>
    </ThemeProvider>
      
  
  );
}

