import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Drawer as MuiDrawer,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WarningIcon from '@mui/icons-material/Warning';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderIcon from '@mui/icons-material/Folder';
import TimelineIcon from '@mui/icons-material/Timeline';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SecurityIcon from '@mui/icons-material/Security';
import { useSelector } from 'react-redux';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  })
);

const Sidebar = ({ open, toggleDrawer }) => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
          {open && 'Menu'}
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        <ListItemButton
          component={Link}
          to="/dashboard"
          selected={isActive('/dashboard')}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Tableau de bord" />
        </ListItemButton>
        
        <ListItemButton
          component={Link}
          to="/incidents"
          selected={isActive('/incidents')}
        >
          <ListItemIcon>
            <WarningIcon />
          </ListItemIcon>
          <ListItemText primary="Incidents" />
        </ListItemButton>
        
        <ListItemButton
          component={Link}
          to="/incidents/create"
          selected={isActive('/incidents/create')}
        >
          <ListItemIcon>
            <AddCircleOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Nouvel incident" />
        </ListItemButton>
        
        <ListItemButton
          component={Link}
          to="/tasks"
          selected={isActive('/tasks')}
        >
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Tâches" />
        </ListItemButton>
        
        <ListItemButton
          component={Link}
          to="/evidence"
          selected={isActive('/evidence')}
        >
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="Preuves" />
        </ListItemButton>
        
        <Divider sx={{ my: 1 }} />
        
        <ListSubheader component="div" inset>
          Rapports & Administration
        </ListSubheader>
        
        <ListItemButton
          component={Link}
          to="/reports"
          selected={isActive('/reports')}
        >
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Rapports" />
        </ListItemButton>
        
        <ListItemButton
          component={Link}
          to="/profile"
          selected={isActive('/profile')}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Profil" />
        </ListItemButton>
        
        {user && user.isAdmin && (
          <ListItemButton
            component={Link}
            to="/admin/users"
            selected={isActive('/admin/users')}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Utilisateurs" />
          </ListItemButton>
        )}
      </List>
    </Drawer>
  );
};

export default Sidebar;