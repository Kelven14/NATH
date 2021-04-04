import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { isAdministrador, isAuthenticated, isEnfermeiroAdm, isMedicoAdm,  } from './services/auth';

// IMPORTS ADMIN
import Dashboard from './pages/admin/dashboard';
import Pacientes from './pages/admin/pacientes';
import PacientesInfo from './pages/admin/pacientes/pacienteInfo';
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


const AdminRoute = ({ component: Component, ...rest }) => (

    <Route
        {...rest}
        render={props =>
             isAdministrador () ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
        }
    />
);

const EnfermeiroRoute = ({ component: Component, ...rest }) => (

    <Route
        {...rest}
        render={props =>
            isEnfermeiroAdm()? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
        }
    />
);

const MedicoRoute = ({ component: Component, ...rest }) => (

    <Route
        {...rest}
        render={props =>
            isMedicoAdm()? (
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
                <GuestRoute path="/" exact component={Login} />
                <Route path="/pacientes/sala" exact component={PacientesSala} />
                {/* Rota Admin */}
                <PrivateRoute path="/admin" exact component={Dashboard} />
                
                <MedicoRoute  path="/admin/pacientes" exact component={Pacientes} />
                <MedicoRoute  path="/admin/paciente/info/:id" exact component={PacientesInfo} />
                <PrivateRoute path="/admin/pacientes/all" exact component={PacientesAll} />
                <EnfermeiroRoute path="/admin/pacientes/cadastrar" exact component={PacientesCadastrar} />
               
                <AdminRoute path="/admin/usuarios" exact component={Usuarios} />
                <AdminRoute path="/admin/usuarios/cadastrar" exact component={UsuarioCadastrar} />
                <Route path="*">
                    <h1>Not found 404</h1>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}