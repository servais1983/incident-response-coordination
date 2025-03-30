import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Grid,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Button,
  Chip,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';
import { getActiveIncidents } from '../slices/incidentSlice';

// Components
import IncidentStatusChart from '../components/dashboard/IncidentStatusChart';
import TaskPriorityChart from '../components/dashboard/TaskPriorityChart';

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { activeIncidents, isLoading, isError, message } = useSelector(
    (state) => state.incidents
  );

  useEffect(() => {
    dispatch(getActiveIncidents());

    if (isError) {
      toast.error(message);
    }
  }, [dispatch, isError, message]);

  // Get severity class for styling
  const getSeverityClass = (severity) => {
    return `severity-${severity.toLowerCase()}`;
  };

  // Get status class for styling
  const getStatusClass = (status) => {
    return `status-${status.toLowerCase()}`;
  };

  // Function to render severity chip
  const renderSeverityChip = (severity) => {
    return (
      <Chip
        label={severity.toUpperCase()}
        size="small"
        className={getSeverityClass(severity)}
        sx={{ fontWeight: 'bold', minWidth: '80px' }}
      />
    );
  };

  // Function to render status chip
  const renderStatusChip = (status) => {
    // Convert status format for display (e.g., 'in-progress' -> 'In Progress')
    const formattedStatus = status
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return (
      <Chip
        label={formattedStatus}
        size="small"
        className={getStatusClass(status)}
        sx={{ fontWeight: 'medium', minWidth: '100px' }}
      />
    );
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Tableau de bord
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/incidents/create"
        >
          Nouvel incident
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Active Incidents Counter */}
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#e3f2fd',
              borderLeft: '5px solid #1976d2',
            }}
          >
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Incidents actifs
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                activeIncidents.length
              )}
            </Typography>
          </Paper>
        </Grid>

        {/* Critical Incidents Counter */}
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#ffebee',
              borderLeft: '5px solid #d32f2f',
            }}
          >
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Incidents critiques
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isLoading ? (
                <CircularProgress />
              ) : (
                activeIncidents.filter((incident) => incident.severity === 'critical').length
              )}
            </Typography>
          </Paper>
        </Grid>

        {/* My Tasks Counter */}
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#e8f5e9',
              borderLeft: '5px solid #388e3c',
            }}
          >
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Mes tâches en cours
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              0
            </Typography>
          </Paper>
        </Grid>

        {/* Team Members Counter */}
        <Grid item xs={12} md={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              bgcolor: '#ede7f6',
              borderLeft: '5px solid #673ab7',
            }}
          >
            <Typography variant="h6" color="textSecondary" gutterBottom>
              Membres de l'équipe
            </Typography>
            <Typography variant="h3" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {user && user.isAdmin ? '5' : '-'}
            </Typography>
          </Paper>
        </Grid>

        {/* Active Incidents List */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Incidents actifs récents
            </Typography>
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                <CircularProgress />
              </Box>
            ) : activeIncidents.length > 0 ? (
              <List sx={{ width: '100%' }}>
                {activeIncidents.slice(0, 5).map((incident) => (
                  <React.Fragment key={incident._id}>
                    <ListItem
                      alignItems="flex-start"
                      component={Link}
                      to={`/incidents/${incident._id}`}
                      sx={{
                        textDecoration: 'none',
                        color: 'inherit',
                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                          <WarningIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="subtitle1" component="span">
                              {incident.title}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              {renderSeverityChip(incident.severity)}
                              {renderStatusChip(incident.status)}
                            </Box>
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography
                              sx={{ display: 'block' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {new Date(incident.createdAt).toLocaleDateString()}
                            </Typography>
                            {incident.description.substring(0, 120)}...
                          </>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography variant="body1" sx={{ p: 2 }}>
                Aucun incident actif.
              </Typography>
            )}
            {activeIncidents.length > 0 && (
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button component={Link} to="/incidents" color="primary">
                  Voir tous les incidents
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 400,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Répartition des incidents
            </Typography>
            {/* Replace this with a real chart component */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1,
              }}
            >
              <Typography variant="body1" color="text.secondary">
                Graphique de répartition des incidents par statut
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* My Tasks */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Mes tâches assignées
            </Typography>
            <List sx={{ width: '100%' }}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    <AssignmentIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" component="span">
                        Collecter les logs du serveur
                      </Typography>
                      <Chip label="URGENT" size="small" color="error" />
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'block' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Incident: Attaque Ransomware
                      </Typography>
                      Extraire et analyser les logs du serveur web pour identifier les points d'entrée
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    <AssignmentIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" component="span">
                        Créer image forensique
                      </Typography>
                      <Chip label="HAUTE" size="small" color="warning" />
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'block' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Incident: Fuite de données
                      </Typography>
                      Créer des images forensiques des postes de travail suspectés d'être compromis
                    </>
                  }
                />
              </ListItem>
            </List>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button component={Link} to="/tasks" color="primary">
                Voir toutes mes tâches
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Recent Evidence */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>
              Preuves récentes
            </Typography>
            <List sx={{ width: '100%' }}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'info.main' }}>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" component="span">
                        apache_access.log
                      </Typography>
                      <Chip label="LOG" size="small" color="info" />
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'block' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Ajouté: 30/03/2025 - 12:45
                      </Typography>
                      Logs du serveur Apache montrant des tentatives d'accès suspectes
                    </>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'info.main' }}>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" component="span">
                        memory_dump_srv01.mem
                      </Typography>
                      <Chip label="MEMORY" size="small" color="info" />
                    </Box>
                  }
                  secondary={
                    <>
                      <Typography
                        sx={{ display: 'block' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Ajouté: 29/03/2025 - 16:30
                      </Typography>
                      Dump mémoire du serveur compromis pour analyse forensique
                    </>
                  }
                />
              </ListItem>
            </List>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button component={Link} to="/evidence" color="primary">
                Voir toutes les preuves
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardScreen;