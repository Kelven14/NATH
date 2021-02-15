import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../../services/api';
import {setNomeUsuario, login, setIdUsuario, setTipoUsuario } from '../../../services/auth';




   

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      
      <Grid item xs={false} sm={4} md={7} className={classes.image} >
      
     
     
   


      </Grid>
      
      
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
       
      </Grid>
    </Grid>
  );
}