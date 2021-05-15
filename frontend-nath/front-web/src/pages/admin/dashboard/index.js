import React, { useState, useEffect } from 'react';

import { makeStyles } from "@material-ui/core/styles";

import Update from "@material-ui/icons/Update";

import Accessibility from "@material-ui/icons/Accessibility";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import GridItem from "../../../components/Grid/GridItem.js"
import GridContainer from "../../../components/Grid/GridContainer.js";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardIcon from "../../../components/Card/CardIcon.js";
import CardFooter from "../../../components/Card/CardFooter.js";


import styles from "../../../asssets/jss/material-dashboard-react/views/dashboardStyle.js"

import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';
import api from '../../../services/api';



const useStyles = makeStyles(styles);
const useStyles1 = makeStyles((theme) => ({
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
    alignItems: 'center',

  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },

}));


let qtdVermelho = 0

export default function Dashboard() {


  const classes1 = useStyles1();
  const classes = useStyles();
  const [info, setInfo] = useState([])

  useEffect(() => {
    async function loadUsuarios() {
      
      const  response = await api.get('information');
      await setInfo(response.data[0])
      console.log(info.quantidadeAmarelo)
    }
    loadUsuarios();
    
  }, [])

 

  return (
   
      <div className={classes1.root} >
      <CssBaseline />
      <MenuAdmin title={'Dashboard'} />
      <main className={classes1.content}>
        <div className={classes1.appBarSpacer} />
        <Container maxWidth="lg" className={classes1.container}>
          <GridContainer>
            <GridItem xs={12} sm={6} md={9}>
              <Card>
                <CardHeader color="rose">
                  <h2 className={classes.cardTitleWhite}>Estátisticas de atendimento</h2>
                  <p className={classes.cardCategoryWhite}>
                  </p>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <CheckCircleOutlineIcon />
                     Pacientes atendidos: {info.quantidadeTotal}
                   </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="danger" stats icon>
                  <CardIcon color="danger">
                    <Accessibility />
                  </CardIcon>
                  <p className={classes.cardCategory}>Quantidade </p>
                  <h3 className={classes.cardTitle} >
                  {info.quantidadeVermelho}
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Update />
                     Tempo médio de espera: {info.tempoVermelho}
                   </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="warning">
                    <Accessibility />
                  </CardIcon>
                  <p className={classes.cardCategory}>Quantidade </p>
                  <h3 className={classes.cardTitle}>
                  {info.quantidadeLaranja}
                  </h3>

                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Update />
                     Tempo médio de espera: 12 min
                   </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>

              <Card>
                <CardHeader color="primary" stats icon>
                  <CardIcon color="primary">
                    <Accessibility />
                  </CardIcon>
                  <p className={classes.cardCategory}>Quantidade </p>
                  <h3 className={classes.cardTitle}>
                  {info.quantidadeAmarelo}
                  </h3>

                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Update />
                     Tempo médio de espera: 40 min
                   </div>
                </CardFooter>
              </Card>

            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <Accessibility />
                  </CardIcon>
                  <p className={classes.cardCategory}>Quantidade </p>
                  <h3 className={classes.cardTitle}>
                  {info.quantidadeVerde}
                  </h3>

                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Update />
                     Tempo médio de espera:55 min
                   </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <Accessibility />
                  </CardIcon>
                  <p className={classes.cardCategory}>Quantidade </p>
                  <h3 className={classes.cardTitle}>
                  {info.quantidadeAzul}
                  </h3>

                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <Update />
                     Tempo médio de espera: 1h20min
                   </div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>

          {/* <GridContainer>

            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardHeader color="warning">
                  <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                  <p className={classes.cardCategoryWhite}>
                    New employees on 15th September, 2016
             </p>
                </CardHeader>
                <CardBody>
                  <Table
                    tableHeaderColor="warning"
                    tableHead={["ID", "Name", "Salary", "Country"]}
                    tableData={[
                      ["1", "Dakota Rice", "$36,738", "Niger"],
                      ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                      ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                      ["4", "Philip Chaney", "$38,735", "Korea, South"]
                    ]}
                  />
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer> */}

          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}

