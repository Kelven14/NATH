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
import MenuAdmin from '../../../components/menu-admin';

dayjs.locale('pt-br');
dayjs.extend(relativeTime);

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
  formControlButton: {
    width: '60%',
    marginTop:20,
  },

}));

function dateFromNow(date) {
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


     async function handleDelete() {
    if (window.confirm("Deseja Exluir essa lista de pacientes?")) {
      var result = await api.delete('patients/delete/All/finishDay');
      if (result.status == 200) {
        window.location.href = '/admin/pacientes/all';
      }
      else {
        alert('Ocorreu um erro. Por favor, tente novamente!')
      }

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
                <h2 align="center">Pacientes </h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">Nome</TableCell>
                            <TableCell align="center">Senha</TableCell>
                            <TableCell align="center">Classificação</TableCell>
                            <TableCell align="center">Tempo de Espera</TableCell>
                            <TableCell align="center">Status</TableCell>
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
                              <TableCell align="center" >{dateFromNow(row.moment)}</TableCell>
                              <TableCell align="center" >{row.status}</TableCell>
                            
                             
                            </TableRow>
                          ))}
                        </TableBody>
                        
                      </Table>
                      
                    </TableContainer>
                    <Grid item  xs={12} sm={12} align="center" >
                                <Button disabled={pacientes.length===0} color="secondary" variant="contained" className={classes.formControlButton} onClick={handleDelete}>EXCLUIR LISTA </Button>
                      
                              </Grid>
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