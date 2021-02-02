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
    
  
    {/** const{ form,setForm}=useState(
      {
        nome:'',
        email:'',
        senha:'',
        tipo:'',
      }
    ); */}
  
   
  
    function handleSubmit(){
  
      const data={
        name:nome,
        password:senha,
        oximetria:oximetria,
        pulse:pulsação,
        pain:dor,
        flowchart:fluxograma,
        color:cor
      }
     
      console.log(data);
      const response=api.post('/patients',data)
    
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
                    <Grid item xs={12} sm={12}>
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
                                max: 100, min: 0
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
                    {/*
                    <Grid item xs={12} sm={4}>
                      <TextField
                      className={classes.formControl}
                      required
                      name="userFluxograma"
                      id="outlined-number"
                      label="Fluxograma"
                      type="number"
                      
                      InputProps={{
                          inputProps: {
                              max: 52, min: 0
                          }
                      }}
                        value={fluxograma}
                        onChange={e => setFluxograma(e.target.value)}
                        variant="outlined"
                      />
                    </Grid>*/}
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
                          <MenuItem value={0}>01 - Dor Abdominal</MenuItem>
                          <MenuItem value={1}>09 - Dor Lombar/Costas</MenuItem>
                          <MenuItem value={2}>26 - Sangramento Digestivo</MenuItem>
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
                          <MenuItem value={0}>Amarelo</MenuItem>
                          <MenuItem value={1}>Laranja</MenuItem>
                          <MenuItem value={2}>Vermelho</MenuItem>
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