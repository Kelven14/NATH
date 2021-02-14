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
import Chip from '@material-ui/core/Chip';
import { ThemeProvider } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

import api from '../../../services/api';
import themeBotao from '../../../theme/botao';

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

}));

function dateFromNow(date) {
  return dayjs(date).fromNow();
}


export default function UsuariosListagem() {
  const classes = useStyles();

  const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    async function loadUsuarios() {
      const response = await api.get('usuarios');
      setUsuarios(response.data)
    }
    loadUsuarios();
  }, [])

  async function handleDelete(id) {
    if (window.confirm("Deseja exlcuir o usuário do sistema?")) {
      var result = await api.delete('usuarios/delete/' + id);
      if (result.status == 200) {
        window.location.href = '/admin/usuarios';
      }
      else {
        alert('Ocorreu um erro. Por favor, tente novamente!')
      }

    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      <MenuAdmin title={'Usuários'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2 align="center">Lista de Usuários</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell align="left">Nome</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Tipo</TableCell>
                            <TableCell align="center">Senha</TableCell>
                            <TableCell align="center">Opções</TableCell>

                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {usuarios.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell align="left" component="th" scope="row">
                                {row.nome}
                              </TableCell  >
                              <TableCell align="center" >{row.usuario}</TableCell>
                              <TableCell align="center" >{row.tipo == "Administrador" ? <Chip
                                label="Administrador(a)"
                                color="secondary"
                              /> : <> <ThemeProvider theme={themeBotao}>  {row.tipo == "Médico" ? <Chip
                                label="Médico(a)"
                                color="primary"
                              /> : <Chip
                                  label="Enfermeiro(a)"
                                  color="secondary"
                                />} </ThemeProvider></>}
                              </TableCell>
                              <TableCell align="center" >{row.senha}</TableCell>
                              <TableCell align="center" >
                                <ButtonGroup aria-label="outlined primary button group">
                                  {/*<Button color="primary" href={'/admin/pacientes/chamar/' + row.id} disabled={row.nome==="Admin"}>Editar</Button>*/}
                                  <Button color="primary" onClick={() => handleDelete(row.id)} disabled={row.tipo==="Administrador"}>Excluir</Button>
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