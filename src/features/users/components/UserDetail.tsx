import React from "react";
import {
  Box,
  Typography,
  Paper,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Button,
} from "@mui/material";
import { User } from "../types/user";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NoteIcon from "@mui/icons-material/Note";
import HistoryIcon from "@mui/icons-material/History";

interface UserDetailProps {
  user: User;
  onEdit: () => void;
}

const UserDetail: React.FC<UserDetailProps> = ({ user, onEdit }) => {
  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "expiring_soon":
        return "warning";
      case "expired":
        return "error";
      default:
        return "default";
    }
  };

  // Helper function to get payment status color
  const getPaymentStatusColor = (status?: string) => {
    switch (status) {
      case "paid":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "error";
      default:
        return "default";
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor:
                  user.gender === "female"
                    ? "primary.light"
                    : "secondary.light",
                mr: 2,
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h5" component="h1">
                {user.name}
              </Typography>
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <Chip
                  label={user.status}
                  color={getStatusColor(user.status) as any}
                  size="small"
                />
                {user.paymentStatus && (
                  <Chip
                    label={user.paymentStatus}
                    color={getPaymentStatusColor(user.paymentStatus) as any}
                    size="small"
                  />
                )}
                {user.tags &&
                  user.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      variant="outlined"
                      size="small"
                    />
                  ))}
              </Box>
            </Box>
          </Box>
          <Button variant="contained" onClick={onEdit}>
            Edit User
          </Button>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 3,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <List disablePadding>
              <ListItem sx={{ px: 0 }}>
                <PersonIcon sx={{ mr: 2, color: "text.secondary" }} />
                <ListItemText
                  primary="Gender"
                  secondary={
                    user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
                  }
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <EmailIcon sx={{ mr: 2, color: "text.secondary" }} />
                <ListItemText primary="Email" secondary={user.email} />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <PhoneIcon sx={{ mr: 2, color: "text.secondary" }} />
                <ListItemText primary="WhatsApp" secondary={user.whatsapp} />
              </ListItem>
            </List>
          </Box>
          <Box sx={{ flex: 1 }}>
            <List disablePadding>
              <ListItem sx={{ px: 0 }}>
                <CalendarTodayIcon sx={{ mr: 2, color: "text.secondary" }} />
                <ListItemText
                  primary="Joined Date"
                  secondary={formatDate(user.joinedDate)}
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <CalendarTodayIcon sx={{ mr: 2, color: "text.secondary" }} />
                <ListItemText
                  primary="Expiry Date"
                  secondary={formatDate(user.expiryDate)}
                />
              </ListItem>
              {user.source && (
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary="Source"
                    secondary={
                      user.source.charAt(0).toUpperCase() + user.source.slice(1)
                    }
                  />
                </ListItem>
              )}
            </List>
          </Box>
        </Box>

        {user.notes && (
          <>
            <Divider sx={{ my: 2 }} />
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ display: "flex", alignItems: "center", mb: 1 }}
              >
                <NoteIcon sx={{ mr: 1 }} /> Notes
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ pl: 4 }}>
                {user.notes}
              </Typography>
            </Box>
          </>
        )}
      </Paper>

      <Card elevation={3}>
        <CardHeader
          title={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <HistoryIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Current Plan</Typography>
            </Box>
          }
        />
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">{user.plan.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {formatDate(user.plan.startDate)} -{" "}
              {formatDate(user.plan.endDate)}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {user.planHistory && user.planHistory.length > 1 && (
        <Card elevation={3} sx={{ mt: 3 }}>
          <CardHeader
            title={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <HistoryIcon sx={{ mr: 1 }} />
                <Typography variant="h6">Plan History</Typography>
              </Box>
            }
          />
          <CardContent>
            <List>
              {user.planHistory.map((plan, index) => (
                <React.Fragment key={plan.id + index}>
                  {index > 0 && <Divider component="li" />}
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={plan.title}
                      secondary={
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(plan.startDate)} -{" "}
                          {formatDate(plan.endDate)}
                        </Typography>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default UserDetail;
