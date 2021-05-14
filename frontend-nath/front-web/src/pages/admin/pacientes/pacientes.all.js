import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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
import Chip from '@material-ui/core/Chip';
import { ThemeProvider } from '@material-ui/core/styles';
import api from '../../../services/api';
import themeChip from '../../../theme/chip';
import themeChip2 from '../../../theme/chip2';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';
import MenuAdmin from '../../../components/menu-admin';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { setVariavel } from '../../../services/auth';
import { TramRounded } from '@material-ui/icons';

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
  formControlButton: {
    width: '60%',
    marginTop: 20,
  },

}));

function dateFromNow(date) {
  return dayjs(date).fromNow();
}


export default function UsuariosListagem() {
  const classes = useStyles();
  const history = useHistory();
  const [pacientes, setPacientes] = useState([])

  useEffect(() => {
    async function loadUsuarios() {
      const response = await api.get('patients');
      setPacientes(response.data)
    }
    loadUsuarios();
  }, [])

  async function loadUsuarios() {
    const response = await api.get('patients');
    setPacientes(response.data)
        
  }


  async function handleChamar(id) {
    if (window.confirm("Deseja chamar o paciente?")) {
      var result = await api.put('patients/called/' + id);
      if (result.status === 200) {
        setVariavel(true)
        history.push('/admin/paciente/info/'+ id)
      }
      else {
        alert('Ocorreu um erro. Por favor, tente novamente!')
      }

    }
  }

  async function handleFinalizar(id) {
    if (window.confirm("Finalizar o atendimento?")) {

      var result = await api.put('patients/finish/' + id);
      if (result.status === 200) {
        history.push('/admin/pacientes/all')
        loadUsuarios();
      }
      else {
        alert('Ocorreu um erro. Por favor, tente novamente!')
      }

    }
  }
  // async function handleDelete() {
  //   if (window.confirm("Deseja Exluir essa lista de pacientes?")) {
  //     var result = await api.delete('patients/delete/All/finishDay');
  //     if (result.status === 200) {
  //       window.location.href = '/admin/pacientes/all';
  //     }
  //     else {
  //       alert('Ocorreu um erro. Por favor, tente novamente!')
  //     }

  //   }
  // }

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

                              <StyledTableCell align="center" >{row.color === "VERMELHO" ? <Chip
                                label="VERMELHO"
                                color="secondary"
                              /> : <> <ThemeProvider theme={themeChip}>{row.color === "LARANJA" ? <Chip
                                label="LARANJA"
                                color="primary"
                              /> : <> {row.color === "AMARELO" ? <Chip
                                label="AMARELO"
                                color="secondary"
                              /> : <> <ThemeProvider theme={themeChip2}>{row.color === "VERDE" ? <Chip
                                label="VERDE"
                                color="primary"
                              /> : <Chip
                                label="AZUL"
                                color="secondary"
                              />}</ThemeProvider></>} </>}</ThemeProvider></>}
                              </StyledTableCell>
                              <StyledTableCell align="center" >{dateFromNow(row.moment)}</StyledTableCell>
                              <StyledTableCell align="center" >{row.status}</StyledTableCell>
                              <StyledTableCell align="center" >
                                <ButtonGroup aria-label="outlined primary button group">
                                  <Button color="primary" disabled={row.status !== "RETIRADO"} onClick={() => handleChamar(row.id)}>CHAMAR</Button>
                                  <Button color="secondary" disabled={row.status !== "MEDICAÇÃO" } onClick={() => handleFinalizar(row.id)}>FINALIZAR</Button>
                                </ButtonGroup>
                              </StyledTableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {/* <Grid item xs={12} sm={12} align="center" >
                      <Button disabled={pacientes.length === 0} color="secondary" variant="contained" className={classes.formControlButton} onClick={handleDelete}>EXCLUIR LISTA </Button>
                    </Grid> */}
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