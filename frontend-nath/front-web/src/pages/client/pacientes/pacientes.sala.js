import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Footer from '../../../components/footer-admin'
import api from '../../../services/api'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.locale('pt-br');
dayjs.extend(relativeTime);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white,
    fontSize: 25,
  },
  body: {
    fontSize: 25,
  },
}))(TableCell);

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
    backgroundColor: '#eeeeee'

  },
  container: {
    padding: '5px'
  },

  paper: {
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    justify: 'center'
  },
  paper1: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  formControl: {
    width: '100%'
  },
  formControlButton: {
    width: '100%',
    marginTop: 20,
  },
  cardBaixo: {
    height: '400px',
    width: '100%',
    borderColor: "#cfe8fc"
  },

  cardCima: {
    height: '200px',
    width: '50%',
    border: '1'
  },
  table: {
    fontSize: 20,
  }

}));

function dateFromNow(date) {
  return dayjs(date).format('HH:mm:ss');
}

export default function PacientesCadastrar() {
  const classes = useStyles();
  const [pacientes, setPacientes] = useState([])
  const [pacientesAtend, setPacientesAtend] = useState([])

  useEffect(() => {
    async function loadUsuarios() {
      const response = await api.get('/patients/status/called');
      setPacientes(response.data)
    }
    async function loadUsuarios2() {
      const response = await api.get('/patients/status/attending');
      setPacientesAtend(response.data)
    }
    loadUsuarios();
    loadUsuarios2();
  }, [])

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container} >
          <Grid container spacing={3} style={{ align: "center" }} >
            <Grid item xs={12} sm={12}  >

              <Grid item xs={12} md={12} className={classes.paper} style={{ backgroundColor: '#3f51b5' }} >

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={6} component={Card} style={{ backgroundColor: '#3f51b5' }} className={classes.cardCima} borderColor=" #FF0000">
                    <Typography align="center" component="h1" variant="h2" style={{ color: '#fff' }}>
                      Senha
                    </Typography>
                    {pacientes.map((tier) => (

                      <Typography align="center" component="h1" variant="h2" style={{ color: '#fff' }}>
                        {tier.password}
                      </Typography>

                    ))}

                  </Grid>
                  <Grid item xs={12} sm={6} md={6} component={Card} className={classes.cardCima}>
                    <Typography align="center" component="h1" variant="h2" style={{ color: '#3f51b5' }}>
                      Sala
                    </Typography>
                    {pacientes.map((tier) => (
                      <Typography align="center" component="h1" variant="h2" style={{ color: '#3f51b5' }}>
                        {tier.senha === null ? " " : "1"}

                      </Typography>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={12} marginTop="0">
              <Card className={classes.cardBaixo}>
                <CardContent>
                  <Typography align="center" component="h1" variant="h4" style={{ color: '#3f51b5' }}>
                    Histórico de chamadas
                    </Typography>
                  <h2 align="center"> </h2>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <StyledTableCell align="center">Senha</StyledTableCell>
                              <StyledTableCell align="center">Paciente</StyledTableCell>
                              <StyledTableCell align="center">Sala</StyledTableCell>
                              <StyledTableCell align="center">Horário de chamada</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {pacientesAtend.map((row) => (
                              <TableRow key={row.id}>
                                <StyledTableCell align="center"  >{row.password}</StyledTableCell>
                                <StyledTableCell align="center" component="th" scope="row">
                                  {row.name}
                                </StyledTableCell  >
                                <StyledTableCell align="center"  >{1}</StyledTableCell>

                                <StyledTableCell align="center" >{dateFromNow(row.momentEnd)}</StyledTableCell>
                              </TableRow>
                            ))}
                          </TableBody>

                        </Table>

                      </TableContainer>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Box pt={2}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
} 