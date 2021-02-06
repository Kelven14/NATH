import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../../../components/footer-admin';
import api from '../../../services/api';
import {setNomeUsuario, login, setIdUsuario, setTipoUsuario } from '../../../services/auth';

import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(/images/background.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#093170'
  },
  paper1: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#093170',
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  style: {
     backgroundColor: '#093170', 
     height: '80vh',
     width: '80%',
     margin: theme.spacing(10, 10),  
    },
}));

export default function SignInSide() {
  const classes = useStyles();
  const[email,setEmail]=useState('');
  const[senha,setSenha]=useState('');
  ;
  async function handleSubmit(){
  
    const data={
      usuario:email,
      senha:senha,
    }
   
      console.log(data);
  await api.post('/usuarios/logar',data)
    .then(response=>{
      if (response.status == 200) {
        
          login(response.data.token);
          setIdUsuario(response.data.id_client);
          setNomeUsuario(response.data.user_name);
          setTipoUsuario(response.data.user_type);
          window.location.href= '/admin'

      }
      else {
        alert('Erro no servidor');
       
      }
    })
     
  }


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