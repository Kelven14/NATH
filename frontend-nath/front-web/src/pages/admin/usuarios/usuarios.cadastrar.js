import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuAdmin from '../../../components/menu-admin'
import Footer from '../../../components/footer-admin'
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import api from '../../../services/api'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: 15,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  formControl: {
    width: '100%'
  },
  formControlButton: {
    width: '100%',
    marginTop:20,
  },

}));

export default function UsuarioCadastrar() {
  const classes = useStyles();
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('');

  {/** const{ form,setForm}=useState(
    {
      nome:'',
      email:'',
      senha:'',
      tipo:'',
    }
  ); */}

  

  async function handleSubmit(){

    const data={
      nome:nome,
      usuario:usuario,
      senha:senha,
      tipo:tipo
    }
    const response= await api.post('/usuarios/cadastrar',data)
    if (response.status == 200) {
      window.location.href = '/admin/usuarios';
    }
    else {
      alert('Ocorreu um erro. Por favor, tente novamente!')
    }

   
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'Usuários'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2 align="center">Cadastro de Usuários</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="nome"
                      name="nome"
                      label="Nome Completo"
                      fullWidth
                      autoComplete="nome"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      type="email"
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      autoComplete="email"
                      value={usuario}
                      onChange={e => setUsuario(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="labelTipo">Tipo</InputLabel>
                      <Select
                        labelId="labelTipo"
                        id="tipo"
                        value={tipo}
                        onChange={e => setTipo(e.target.value)}
                        variant="outlined"
                      >
                        <MenuItem value={0}>Administrador(a)</MenuItem>
                        <MenuItem value={1}>Médico(a)</MenuItem>
                        <MenuItem value={2}>Enfermeiro(a)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      type="password"
                      id="senha"
                      name="senha"
                      label="Senha"
                      fullWidth
                      autoComplete="senha"
                      value={senha}
                      onChange={e => setSenha(e.target.value)}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button className={classes.formControlButton} variant="contained" onClick={handleSubmit} color="primary">
                      Cadastrar
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}