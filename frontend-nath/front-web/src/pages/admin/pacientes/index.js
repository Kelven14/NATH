import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Footer from '../../../components/footer-admin'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ExitToApp from '@material-ui/icons/ExitToApp';
import CheckBox from '@material-ui/icons/CheckBox';
import Chip from '@material-ui/core/Chip';
import { ThemeProvider } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import api from '../../../services/api';
import themeChip from '../../../theme/chip';

import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('pt-br');
dayjs.extend(relativeTime);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
    marginLeft: 3,
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
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },

}));

function dateFromNow(date){
  return dayjs(date).fromNow();
}


export default function UsuariosListagem() {
  const classes = useStyles();

  const [pacientes, setPacientes] = useState([])

  useEffect(() => {
    async function loadUsuarios() {
      const response = await api.get('patients');
      setPacientes(response.data)
    }
    loadUsuarios();
  }, [])

  async function handleDelete(id){
    if(window.confirm("Deseja retirar o paciente da fila?")){
      var result = await api.delete('patients/delete/'+id);
      if(result.status==200){
        window.location.href='/admin/pacientes';
      }
      else{
        alert('Ocorreu um erro. Por favor, tente novamente!')
      }
    
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="absolute" className={clsx(classes.appBar && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton component="a" href="/admin">
            <ExitToApp />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2 align="center">Pacientes Aguardando na Sala de Espera</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">Nome</TableCell>
                            <TableCell align="center">Senha</TableCell>
                            <TableCell align="center">Classificação</TableCell>
                            <TableCell align="center">Tempo</TableCell>
                            <TableCell align="center">Opções</TableCell>

                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {pacientes.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell align="left" component="th" scope="row">
                                {row.name}
                              </TableCell  >
                              <TableCell align="center" >{row.password}</TableCell>
                              
                                <TableCell align="center" >{row.color == "VERMELHO" ? <Chip
                                  label="VERMELHO"
                                  color="secondary"
                                /> : <> <ThemeProvider theme={themeChip}>  {row.color == "LARANJA" ? <Chip
                                  label="LARANJA"

                                  color="primary"
                                /> : <Chip
                                    label="AMARELO"
                                    color="secondary"
                                  />} </ThemeProvider></>}
                                </TableCell>

                             

                              <TableCell align="center" >{ dateFromNow(row.moment) }</TableCell>
                              <TableCell align="center" >
                              <ButtonGroup  aria-label="outlined primary button group">
                              <Button color="primary" >CHAMAR</Button>
                              <Button color="secondary" onClick={()=>handleDelete(row.id)}>CONFIRMAR</Button>
                              </ButtonGroup>                        
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
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