import React from 'react';
import Routes from './Routes';
import {ThemeProvider} from '@material-ui/core/styles';
import theme from './theme';
import axios from 'axios';



export default function App() {
  
  return (
    <ThemeProvider theme={theme}>
      <Routes/>
    </ThemeProvider>
      
  
  );
}

