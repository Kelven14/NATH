import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

// IMPORTS ADMIN
import Dashboard from './pages/admin/dashboard';

import Pacientes from './pages/admin/pacientes';
import PacientesAll from './pages/admin/pacientes/pacientes.all';
import PacientesEditar from './pages/admin/pacientes/pacientes.editar';
import PacientesChamar from './pages/admin/pacientes/pacientes.chamar';
import PacientesCadastrar from './pages/admin/pacientes/pacientes.cadastrar';

import Usuarios from './pages/admin/usuarios';
import UsuarioCadastrar from './pages/admin/usuarios/usuarios.cadastrar';

// IMPORTS CLIENT
import Login from './pages/client/login';
import PacientesSala from './pages/client/pacientes/pacientes.sala';
import { isAuthenticated } from './services/wAuth';


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



export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {/* Rota Cliente */}
                <Route path="/" exact component={Login} />
                <Route path="/pacientes/sala" exact component={PacientesSala} />

                {/* Rota Admin */}
                <PrivateRoute path="/admin" exact component={Dashboard} />

                <PrivateRoute path="/admin/pacientes" exact component={Pacientes} />
                <PrivateRoute path="/admin/pacientes/all" exact component={PacientesAll} />
                <PrivateRoute path="/admin/pacientes/cadastrar" exact component={PacientesCadastrar} />
                <Route path="/admin/pacientes/editar" exact component={PacientesEditar} />
                <PrivateRoute path="/admin/pacientes/chamar" exact component={PacientesChamar} />
                <PrivateRoute path="/admin/usuarios" exact component={Usuarios} />
                <PrivateRoute path="/admin/usuarios/cadastrar" exact component={UsuarioCadastrar} />
             
                <Route path="*">
                    <h1>Not found 404</h1>
                </Route>

            </Switch>
        </BrowserRouter>
    )
}