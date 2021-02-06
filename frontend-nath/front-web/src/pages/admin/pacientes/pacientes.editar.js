import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';

import api from '../../../services/api';
import themeChip from '../../../theme/chip';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ExitToApp from '@material-ui/icons/ExitToApp';

import clsx from 'clsx';

import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import StarIcon from '@material-ui/icons/StarBorder';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },

  image: {
    backgroundImage: 'url(/images/background.jpg)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'none',
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  avatar: {
    background: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(1),
  },
  form: {
    margin: theme.spacing(2, 4),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],

  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  paper: {
    margin: theme.spacing(8, 4),
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#093170'
  },
  paperDireita: {
    margin: theme.spacing(8, 8),
    alignItems: 'center',
    width: '80%',
    padding: theme.spacing(2),
    marginTop: theme.spacing(16),
    backgroundColor: '#093170'
  },
  paper1: {
    marginTop: theme.spacing(22),
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#093170'
  },
  direita: {

    backgroundColor: '#093170'
  },
  tamanhoCard: {
    margin: theme.spacing(12,7),
    width: '80%',
   
  },
  div1: {
    margin: theme.spacing(2,10),
  
   
  }
}));


function SignIn() {
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
    <Grid container className={classes.root}>
      <Grid
        item
        container
        direction="column"
        justify="center"
        alignItems="center"
        xs={false} sm={4} md={7}
        className={classes.image}
      >
         <CssBaseline />
        <Grid item xs={12} sm={8} md={10} component={Paper} className={classes.paper}>
          <Typography style={{ color: '#fff', fontSize: 35, lineHeight: '45px' }}>
          Espere a sua senha ser chamada!
         </Typography>
         
          {pacientes.map((tier) => (
           
              <Card className={classes.tamanhoCard}>
                <CardHeader
                  title='SENHA'
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                >

                </CardHeader>

                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      {tier.password}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
           
          ))}

        </Grid>

      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className={classes.direita}  >
            
      <Paper className={classes.paperDireita}>
          <Typography align="center" style={{ color: '#fff', fontSize: 35, lineHeight: '45px' }}>
           
              Últimas Senhas chamadas
          </Typography>
          <Grid item xs={12} sm={8} className={classes.div1}>
            <TableContainer component={Paper} >
              <Table className={classes.table}aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" >Senha</TableCell>
                    <TableCell  align="center">Nome</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pacientesAtend.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell  align="left">{row.password}</TableCell>
                      <TableCell   align="center"component="th" scope="row">
                        {row.name}
                      </TableCell  >
                      

                     

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>



        </Paper>

        
      </Grid>
    </Grid>
  );
}

export default SignIn;