import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PeopleIcon from '@material-ui/icons/People';
import GroupAdd from '@material-ui/icons/GroupAdd';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Help from '@material-ui/icons/Help';
import AccountBox from '@material-ui/icons/AccountBox';
import FeaturedPlayList from '@material-ui/icons/FeaturedPlayList';

export const mainListItems = (
  <div>

    <ListItem button component="a"  href="/admin">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component="a"  href="/admin/pacientes/cadastrar">
      <ListItemIcon>
        <GroupAdd />
      </ListItemIcon>
      <ListItemText primary="Adicionar Pacientes" />
    </ListItem>
    <ListItem button component="a"  href="/admin/pacientes">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Consultar Pacientes" />
    </ListItem>
    <ListItem button component="a"  href="/admin/pacientes/all">
      <ListItemIcon>
        <FeaturedPlayList />
      </ListItemIcon>
      <ListItemText primary="Todos Pacientes" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Opções</ListSubheader>
    <ListItem button  component="a"  href="/admin/usuarios/cadastrar">
      <ListItemIcon>
        <AccountCircle />
      </ListItemIcon>
      <ListItemText primary="Adicionar Usuários" />
    </ListItem>
    <ListItem button  component="a"  href="/admin/usuarios">
      <ListItemIcon>
        <AccountBox />
      </ListItemIcon>
      <ListItemText primary="Consultar Usuários" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <Help />
      </ListItemIcon>
      <ListItemText primary="Ajuda" />
    </ListItem> 
    <ListItem button>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItem>
  </div>
);