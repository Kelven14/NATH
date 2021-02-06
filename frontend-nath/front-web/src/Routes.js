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
import Login from './pages/client/login';
import PacientesSala from './pages/client/pacientes/pacientes.sala';

export default function Routes(){
    return(
        <BrowserRouter>
        <Switch>
                {/* Rota Cliente */}
                <Route path="/" exact component={Login} />
                <Route path="/pacientes/sala" exact component={PacientesSala} />

                {/* Rota Admin */}
                <Route path="/admin" exact component={Dashboard} />
                
                <Route path="/admin/pacientes" exact component={Pacientes} />
                <Route path="/admin/pacientes/all" exact component={PacientesAll} />
                <Route path="/admin/pacientes/cadastrar" exact component={PacientesCadastrar} />
                <Route path="/admin/pacientes/editar" exact component={PacientesEditar} />
                <Route path="/admin/pacientes/chamar/:idPacientes" exact component={PacientesChamar} />

                <Route path="/admin/usuarios" exact component={Usuarios} />
                <Route path="/admin/usuarios/cadastrar" exact component={UsuarioCadastrar} />
                <Route path="/admin/usuarios/editar" exact component={UsuarioEditar} />

                <Route path="*">
                    <h1>Not found 404</h1>
                </Route>
        
        </Switch>
        </BrowserRouter>
    )
}