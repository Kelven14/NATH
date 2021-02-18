import React, { useState, useEffect } from 'react';
import {  withStyles, makeStyles } from '@material-ui/core/styles';
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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white,
    fontSize: 20,
  },
  body: {
    fontSize: 20,
  },
}))(TableCell);
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

function dateFromNow(date) {
  return dayjs(date).fromNow();
}


export default function UsuariosListagem() {
  const classes = useStyles();

  const [pacientes, setPacientes] = useState([])

  useEffect(() => {
    async function loadUsuarios() {
      const response = await api.get('patients/status/waiting');
      setPacientes(response.data)
    }
    loadUsuarios();
  }, [])

  async function handleChamar(id) {
    if (window.confirm("Deseja chamar o paciente?")) {
      var result = await api.put('patients/called/' + id);
      if (result.status == 200) {
        window.location.href = '/admin/pacientes';
      }
      else {
        alert('Ocorreu um erro. Por favor, tente novamente!')
      }

    }
  }

  async function handleConfirmar(id) {
    if (window.confirm("Deseja retirar o paciente da fila?")) {
      var result = await api.put('patients/attending/' + id);
      if (result.status == 200) {
        window.location.href = '/admin/pacientes';
      }
      else {
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
                            <StyledTableCell align="left">Nome</StyledTableCell>
                            <StyledTableCell align="center">Senha</StyledTableCell>
                            <StyledTableCell align="center">Classificação</StyledTableCell>
                            <StyledTableCell align="center">Tempo de Espera</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                            <StyledTableCell align="center">Opções</StyledTableCell>

                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {pacientes.map((row) => (
                            <TableRow key={row.id}>
                              <StyledTableCell align="left" component="th" scope="row">
                                {row.name}
                              </StyledTableCell  >
                              <StyledTableCell align="center" >{row.password}</StyledTableCell>

                              <StyledTableCell align="center" >{row.color == "VERMELHO" ? <Chip
                                label="VERMELHO"
                                color="secondary"
                              /> : <> <ThemeProvider theme={themeChip}>  {row.color == "LARANJA" ? <Chip
                                label="LARANJA"

                                color="primary"
                              /> : <Chip
                                  label="AMARELO"
                                  color="secondary"
                                />} </ThemeProvider></>}
                              </StyledTableCell>
                              <StyledTableCell align="center" >{dateFromNow(row.moment)}</StyledTableCell>
                              <StyledTableCell align="center" >{row.status}</StyledTableCell>
                              <StyledTableCell align="center" >
                                <ButtonGroup aria-label="outlined primary button group">
                                  <Button color="primary" onClick={() => handleChamar(row.id)}>CHAMAR</Button>
                                  <Button color="secondary" onClick={() => handleConfirmar(row.id)} disabled={row.status!=="CALLED"}>CONFIRMAR</Button>
                                </ButtonGroup>
                                {/* href={'/admin/pacientes/chamar/' + row.id} */ }
                              </StyledTableCell>
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