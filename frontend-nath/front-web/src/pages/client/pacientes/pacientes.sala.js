import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';

import api from '../../../services/api';




import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import StarIcon from '@material-ui/icons/StarBorder';

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
    margin: theme.spacing(6),
  }
}));


function Sala() {
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
        xs={false} sm={4} md={12}
        className={classes.image}
      >
        <Typography style={{ color: '#fff', fontSize: 35, lineHeight: '45px' }}>
          
            Espere a sua senha ser chamada!
          
        </Typography>
        <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square className={classes.paper}>

          {pacientes.map((tier) => (
            <Grid item key={tier.id} xs={12} sm={6} md={12}  >
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
            </Grid>
          ))}

        </Grid>

      </Grid>
    
    </Grid>
  );
}

export default Sala;