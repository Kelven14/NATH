import React from 'react';
import { makeStyles } from "@material-ui/core";
import Routes from './Routes';

const useStyles = makeStyles({
  appMain: {

    width: '100%',
    
  }
})


export default function App() {
  const classes = useStyles();
  return (
    
    <div className="App">
      <Routes/>
    </div>    
  );
}

