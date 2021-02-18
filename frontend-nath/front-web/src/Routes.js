import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './services/auth';

// IMPORTS ADMIN
import Dashboard from './pages/admin/dashboard';
import Pacientes from './pages/admin/pacientes';
import PacientesAll from './pages/admin/pacientes/pacientes.all';
import PacientesCadastrar from './pages/admin/pacientes/pacientes.cadastrar';
import Usuarios from './pages/admin/usuarios';
import UsuarioCadastrar from './pages/admin/usuarios/usuarios.cadastrar';
// IMPORTS CLIENT
import Login from './pages/client/login';
import PacientesSala from './pages/client/pacientes/pacientes.sala';


const PrivateRoute = ({ component: Component, ...rest }) => (

    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
        }
    />
);

const GuestRoute = ({ component: Component, ...rest }) => (

    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Redirect to={{ pathname: "/admin", state: { from: props.location } }} />
            ) : (
                   
                    <Component {...props} />
                )
        }
    />
);




export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {/* Rota Cliente */}
                <GuestRoute path="/" exact component={Login} />
                <Route path="/pacientes/sala" exact component={PacientesSala} />
                {/* Rota Admin */}
                <PrivateRoute path="/admin" exact component={Dashboard} />
                
                <PrivateRoute path="/admin/pacientes" exact component={Pacientes} />
                <PrivateRoute path="/admin/pacientes/all" exact component={PacientesAll} />
                <PrivateRoute path="/admin/pacientes/cadastrar" exact component={PacientesCadastrar} />
               
                <PrivateRoute path="/admin/usuarios" exact component={Usuarios} />
                <PrivateRoute path="/admin/usuarios/cadastrar" exact component={UsuarioCadastrar} />
                <PrivateRoute path="*"/>
                   
            </Switch>
        </BrowserRouter>
    )
}