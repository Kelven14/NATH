import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Footer from '../../../components/footer-admin'
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import api from '../../../services/api'
import { useParams } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import { useHistory } from "react-router-dom";

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
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: 15,
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    formControl: {
        width: '100%'
    },
    formControlButton: {
        width: '60%',
        marginTop: 20,
    },


}));

export default function PacientesCadastrar() {
    const classes = useStyles();
    const [pacientes, setPacientes] = useState([])
    const { id } = useParams();
    const history = useHistory();
    const [confirmar, setConfirmar] = useState(0)
    const [contador, setContador] = useState(1)
   

    useEffect(() => {
        async function loadUsuarios() {
            const response = await api.get('patients/' + id);
            setPacientes(response.data)
        }
        loadUsuarios();
    }, [])

  
    async function handleMedicacao() {
        if (window.confirm("Confirmar a ida do paciente a medicação?")) {
            var result = await api.put('patients/medication/' + id);
            if (result.status === 200) {
                history.push('/admin/pacientes')
            }
            else {
                alert('Ocorreu um erro. Por favor, tente novamente!')
            }

        }
    }
    async function handleFinalizar() {
        if (window.confirm("Finalizar o atendimento?")) {

            var result = await api.put('patients/finish/' + id);
            if (result.status === 200) {
                history.push('/admin/pacientes')
            }
            else {
                alert('Ocorreu um erro. Por favor, tente novamente!')
            }

        }
    }

    async function handleConfirmar() {
        if (window.confirm("Paciente chegou na sala?")) {
            var result = await api.put('patients/attending/' + id);
            if (result.status === 200) {
                setConfirmar(1);
                setContador(0);
            }
            else {
                alert('Ocorreu um erro. Por favor, tente novamente!')
            }

        }
    }

    async function handleProximo() {
        if (window.confirm("Tem certeza que o Paciente não compareceu?")) {
            var result = await api.put('patients/retirado/' + id);
            if (result.status === 200) {
                history.push('/admin/pacientes')
               
            }
            else {
                alert('Ocorreu um erro. Por favor, tente novamente!')
            }

        }
    }

    async function handleChamar() {
        if (window.confirm("Deseja chamar novamente o paciente?")) {

            var result = await api.put('patients/called/' + id);
            if (result.status === 200) {
                setContador(contador + 1)
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

                </Toolbar>
            </AppBar>
            {/* <MenuAdmin title={'Pacientes'} /> */}
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item sm={12}>
                            <Paper className={classes.paper}>
                                <h2 align="center">Informações do Paciente</h2>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={8}>
                                        <TextField
                                            disabled
                                            id="nome"
                                            name="nome"
                                            label="Nome"
                                            fullWidth

                                            value={pacientes.name}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            disabled
                                            id="senha"
                                            name="senha"
                                            label="Senha"
                                            fullWidth
                                            autoComplete="senha"
                                            value={pacientes.password}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            className={classes.formControl}
                                            disabled
                                            name="userOximetria"
                                            autoFocus
                                            id="outlined-number"
                                            label="Temperatura"
                                            type="number"

                                            value={pacientes.temperature}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            className={classes.formControl}
                                            disabled
                                            name="userOximetria"
                                            autoFocus
                                            id="outlined-number"
                                            label="Oximetria"
                                            type="number"

                                            value={pacientes.oximetry}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            className={classes.formControl}
                                            disabled
                                            name="userPulsação"
                                            autoFocus
                                            id="pulsação"
                                            label="pulsação"
                                            type="number"
                                            value={pacientes.pulse}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            className={classes.formControl}
                                            disabled
                                            id="dor"
                                            name="dor"
                                            label="dor"
                                            autoFocus

                                            type="number"
                                            value={pacientes.pain}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}>

                                        <TextField
                                            className={classes.formControl}
                                            id="fluxograma"
                                            name="fluxograma"
                                            label="fluxograma"
                                            disabled
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            value={pacientes.flowchart}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField className={classes.formControl}
                                            disabled
                                            id="cor"
                                            name="cor"
                                            label="cor"
                                            variant="outlined"
                                            value={pacientes.color}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />

                                    </Grid>

                                    <Grid item xs={4} sm={4} align="center" >
                                        <Button disabled={pacientes.length === 0 || confirmar===1} color="secondary" variant="contained" className={classes.formControlButton} onClick={() => handleChamar()}>CHAMAR PACIENTE</Button>
                                    </Grid>

                                    <Grid item xs={4} sm={4} align="center" >
                                        <Button disabled={pacientes.length === 0 || confirmar===1} color="primary" variant="contained" className={classes.formControlButton} onClick={() => handleConfirmar()} > CHEGOU</Button>
                                    </Grid>
                                    <Grid item xs={4} sm={4} align="center" >
                                        <Button  color="secondary" variant="contained" className={classes.formControlButton} onClick={() => handleProximo()} disabled={contador < 3}> NÃO CHEGOU</Button>
                                    </Grid>
                                   
                                    <Grid align="center" item xs={12} sm={6}>
                                        <Button className={classes.formControlButton} onClick={() => handleMedicacao()} disabled={confirmar === 0} variant="contained" color="secondary">
                                            Medicação
                                        </Button>

                                    </Grid>
                                    <Grid align="center" item xs={12} sm={6}>
                                        <Button className={classes.formControlButton} onClick={() => handleFinalizar()} disabled={confirmar === 0} variant="contained" color="primary">
                                            Finalizar atendimento
                                        </Button>
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