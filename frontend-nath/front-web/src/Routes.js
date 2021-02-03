import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// IMPORTS ADMIN
import Dashboard from './pages/admin/dashboard';

import Pacientes from './pages/admin/pacientes';
import PacientesAll from './pages/admin/pacientes/pacientes.all';
import PacientesEditar from './pages/admin/pacientes/pacientes.editar';
import PacientesChamar from './pages/admin/pacientes/pacientes.chamar';
import PacientesCadastrar from './pages/admin/pacientes/pacientes.cadastrar';

import Usuarios from './pages/admin/usuarios';
import UsuarioEditar from './pages/admin/usuarios/usuarios.editar';
import UsuarioCadastrar from './pages/admin/usuarios/usuarios.cadastrar';

// IMPORTS CLIENT
import Home from './pages/client/home';
import PacientesDetails from './pages/client/pacientes/pacientes.details';

export default function Routes(){
    return(
        <BrowserRouter>
        <Switch>
                {/* Rota Cliente */}
                <Route path="/" exact component={Home} />
                <Route path="/pacientes/:idPacientes" exact component={PacientesDetails} />

                {/* Rota Admin */}
                <Route path="/admin" exact component={Dashboard} />
                
                <Route path="/admin/pacientes" exact component={Pacientes} />
                <Route path="/admin/pacientes/all" exact component={PacientesAll} />
                <Route path="/admin/pacientes/cadastrar" exact component={PacientesCadastrar} />
                <Route path="/admin/pacientes/editar/:idPacientes" exact component={PacientesEditar} />
                <Route path="/admin/pacientes/chamar/:idPacientes" exact component={PacientesChamar} />

                <Route path="/admin/usuarios" exact component={Usuarios} />
                <Route path="/admin/usuarios/cadastrar" exact component={UsuarioCadastrar} />
                <Route path="/admin/usuarios/editar/:idUsuario" exact component={UsuarioEditar} />

                <Route path="*">
                    <h1>Not found 404</h1>
                </Route>
        
        </Switch>
        </BrowserRouter>
    )
}