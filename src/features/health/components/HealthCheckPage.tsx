import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, CircularProgress, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { healthService, HealthStatus } from '../../../services/HealthService';

const StatusPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  borderRadius: 16,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  maxWidth: 600,
  margin: '0 auto',
}));

const HealthCheckPage: React.FC = () => {
  const [status, setStatus] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const checkServerHealth = async () => {
    setLoading(true);
    try {
      const healthStatus = await healthService.checkHealth();
      setStatus(healthStatus);
    } catch (error) {
      console.error('Error checking health:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkServerHealth();
    
    // Set up polling every 30 seconds
    const intervalId = setInterval(checkServerHealth, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (loading && !status) {
    return (
      <Container sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <StatusPaper elevation={3}>
        {status?.isHealthy ? (
          <Box sx={{ color: 'success.main' }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 80 }} />
            <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
              All Systems Operational
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              Our servers are running smoothly.
            </Typography>
          </Box>
        ) : (
          <Box sx={{ color: 'error.main' }}>
            <ErrorOutlineIcon sx={{ fontSize: 80 }} />
            <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
              Service Unavailable
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              We're experiencing some technical difficulties. Our team has been notified and is working to resolve the issues.
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              {status?.message}
            </Typography>
          </Box>
        )}
        
        <Box sx={{ mt: 3, mb: 2 }}>
          <Typography variant="caption" color="textSecondary">
            Last checked: {status?.lastChecked.toLocaleTimeString()}
          </Typography>
        </Box>
        
        <Button 
          variant="contained" 
          color={status?.isHealthy ? "success" : "primary"}
          onClick={checkServerHealth}
          sx={{ mt: 2 }}
        >
          Check Again
        </Button>
      </StatusPaper>
    </Container>
  );
};

export default HealthCheckPage; 