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
  
  export default function  PacientesCadastrar() {
    const classes = useStyles();
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [oximetria, setOximetria] = useState('');
    const [pulsação, setPulsação] = useState('');
    const [dor, setDor] = useState('');
    const [fluxograma, setFluxograma] = useState('');
    const [cor, setCor] = useState('');
    const [temperatura, setTemperatura] = useState('');
    
     async function handleSubmit(){
      const data={
        name:nome,
        password:senha,
        oximetry:oximetria,
        pulse:pulsação,
        pain:dor,
        flowchart:fluxograma,
        color:cor,
        temperature:temperatura
      }
     
      const response= await api.post('/patients',data)

      if (response.status == 201) {
        alert('Paciente cadastrado!')
        window.location.href = '/admin/pacientes/cadastrar';
      }
      else {
        alert('Ocorreu um erro. Por favor, tente novamente!')
      }

    }

    return (
      <div className={classes.root}>
        <MenuAdmin title={'Pacientes'} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <Paper className={classes.paper}>
                  <h2 align="center">Cadastro de Pacientes</h2>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}>
                      <TextField
                        required
                        id="nome"
                        name="nome"
                        label="Nome"
                        fullWidth
                        autoComplete="nome"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
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
                    <Grid item xs={12} sm={4}>
                      <TextField
                      className={classes.formControl}
                     required
                     name="userTemperatura"
                     autoFocus
                     id="outlined-number"
                     label="Temperatura"
                     type="number"
                     

                     InputProps={{
                         inputProps: {
                             max: 100, min: 0
                         }
                     }}
                     value={temperatura}
                     onChange={e => setTemperatura(e.target.value)}
                     variant="outlined"
              
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                      className={classes.formControl}
                     required
                     name="userOximetria"
                     autoFocus
                     id="outlined-number"
                     label="Oximetria"
                     type="number"
                     

                     InputProps={{
                         inputProps: {
                             max: 100, min: 0
                         }
                     }}
                     value={oximetria}
                     onChange={e => setOximetria(e.target.value)}
                     variant="outlined"
              
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                      className={classes.formControl}
                        required
                        name="userPulsação"
                        autoFocus
                        id="outlined-number"
                        label="Pulsação"
                        type="number"
                        InputProps={{
                            inputProps: {
                                max: 300, min: 0
                            }
                        }}
                        value={pulsação}
                        onChange={e => setPulsação(e.target.value)}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                      className={classes.formControl}
                     required
                     name="userNivelDor"
                     id="outlined-number"
                     autoFocus
                     label="Nível de dor"
                     type="number"
                     
                     InputProps={{
                         inputProps: {
                             max: 10, min: 0
                         }
                     }}
                     value={dor}
                     onChange={e => setDor(e.target.value)}
                     variant="outlined"
                      />
                    </Grid>
                  
                      <Grid item xs={12} sm={4}>
                      <FormControl className={classes.formControl}
                           required
                         
                        >
                        <InputLabel  id="labelTipo">Fluxograma</InputLabel>
                        <Select
                          variant="outlined"
                          labelId="labelFluxograma"
                          id="fluxograma"
                          value={fluxograma}
                          onChange={e => setFluxograma(e.target.value)}
                      
                        >
                          <MenuItem value={0}>19 - Dor Abdominal</MenuItem>
                          <MenuItem value={1}>25 - Dor Torácica</MenuItem>
                          <MenuItem value={2}>40 - Problemas em extremidades</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl className={classes.formControl}
                           required
                         
                        >
                        <InputLabel  id="labelTipo">Cor classificado</InputLabel>
                        <Select
                          variant="outlined"
                          labelId="labelCor"
                          id="cor"
                          value={cor}
                          onChange={e => setCor(e.target.value)}
                      
                        >
                          <MenuItem value={0}>Azul</MenuItem>
                          <MenuItem value={1}>Verde</MenuItem>
                          <MenuItem value={2}>Amarelo</MenuItem>
                          <MenuItem value={3}>Laranja</MenuItem>
                          <MenuItem value={4}>Vermelho</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    <Grid item  xs={12} sm={12}>
                      <Button  className={classes.formControlButton} variant="contained" onClick={handleSubmit} color="primary">
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