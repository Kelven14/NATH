import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Footer from '../../../components/footer-admin';
import api from '../../../services/api';
import { setNomeUsuario, login, setIdUsuario, setTipoUsuario } from '../../../services/auth';
import themeBotao from '../../../theme/botao';
import {ThemeProvider} from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    
  },
  image: {
    backgroundImage: 'url(https://vencerocancer.org.br/wp-content/uploads/2018/08/2018_ivoc_tecnologia_saude_futurista_23805293_everythingposs_agosto-1000x563.jpg)',

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
   
  },
  
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#2196f3',

  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  ;

  async function handleSubmit() {
    const data = {
      usuario: email,
      senha: senha,
    }
    console.log(data);
    await api.post('/usuarios/logar', data)
      .then(response => {
        if (response.status == 200) {
          login(response.data.token);
          setIdUsuario(response.data.nome);
          setNomeUsuario(response.data.usuario);
          setTipoUsuario(response.data.tipo);
          window.location.href = '/admin'
        }
        else {
          alert('Erro no servidor');
        }
      })
  }


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />
          <ThemeProvider theme={themeBotao}>
            <Button

              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Entrar
          </Button>
          </ThemeProvider>


          <Box mt={5}>
            <Footer />
          </Box>

        </div>
      </Grid>
    </Grid>
  );
}