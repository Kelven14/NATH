import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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
import Chip from '@material-ui/core/Chip';
import { ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import api from '../../../services/api';
import themeChip from '../../../theme/chip';
import themeChip2 from '../../../theme/chip2';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useHistory } from "react-router-dom";

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
  const history = useHistory();
  const classes = useStyles();
  const [pacientes, setPacientes] = useState([])
  const primeiro=pacientes[0]
  const [contador, setContador] = useState(0)

  useEffect(() => {
    async function loadUsuarios() {
      const response = await api.get('patients/status/waiting');
      setPacientes(response.data)
    }
    loadUsuarios();

  }, [])

  async function loadUsuarios() {
    const response = await api.get('patients/status/waiting');
    setPacientes(response.data)
  }

  async function handleChamar() {
    if (window.confirm("Deseja chamar o paciente?")) {

      var result = await api.get('patients/status/waitingOne');
      console.log(result)
      if (result.status == 200) {
    
        history.push('/admin/pacientes')
        loadUsuarios();
      }
      else {
        alert('Ocorreu um erro. Por favor, tente novamente!')
      }

    }
  }

  async function handleConfirmar() {
    if (window.confirm("Paciente chegou na sala?")) {
      var result = await api.put('patients/attending/' + primeiro.id);
      if (result.status == 200) {
        history.push('/admin/paciente/info/'+primeiro.id)
        setContador(0);
        loadUsuarios();
      }
      else {
        alert('Ocorreu um erro. Por favor, tente novamente!')
      }

    }
  }

  async function handleProximo() {
    if (window.confirm("Deseja retirar o paciente da fila?")) {
      var result = await api.put('patients/retirado/' + primeiro.id);
      if (result.status == 200) {
        history.push('/admin/pacientes')
        setContador(0);
        loadUsuarios();
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
                              /> : <> <ThemeProvider theme={themeChip}>{row.color == "LARANJA" ? <Chip
                                label="LARANJA"
                                color="primary"
                              /> : <> {row.color == "AMARELO" ? <Chip
                                label="AMARELO"
                                color="secondary"
                              /> : <> <ThemeProvider theme={themeChip2}>{row.color == "VERDE" ? <Chip
                                label="VERDE"
                                color="primary"
                              /> : <Chip
                                label="AZUL"
                                color="secondary"
                              />}</ThemeProvider></>} </>}</ThemeProvider></>}
                              </StyledTableCell>
                              <StyledTableCell align="center" >{dateFromNow(row.moment)}</StyledTableCell>
                              <StyledTableCell align="center" >{row.status}</StyledTableCell>

                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item xs={4} sm={4} align="center" >
                    <Button disabled={pacientes.length === 0} color="secondary" variant="contained" className={classes.formControlButton} onClick={() => handleChamar()}>CHAMAR PACIENTE</Button>
                  </Grid>
                  <Grid item xs={4} sm={4} align="center" >
                    <Button disabled={pacientes.length === 0} color="secondary" variant="contained" className={classes.formControlButton} onClick={() => handleConfirmar()} disabled={contador == 0}>CONFIRMAR CHEGADA</Button>
                  </Grid>
                  <Grid item xs={4} sm={4} align="center" >
                    <Button disabled={pacientes.length === 0} color="secondary" variant="contained" className={classes.formControlButton} onClick={() => handleProximo()} disabled={contador < 3}>PRÓXIMO PACIENTE</Button>
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