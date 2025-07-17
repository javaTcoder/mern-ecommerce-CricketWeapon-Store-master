import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Paper, Box, Avatar, Select, MenuItem } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Siderbar";
import { makeStyles } from "@mui/styles";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles"
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";


const useStyles = makeStyles((theme) => ({
  updateUser1: {
    display: "flex",
    alignItems: "flex-start",
    backgroundColor: "#f1f1f1",
    justifyContent: "center",
    width: "100%",
    gap: "1rem",
    overflow: "hidden",
    margin: "-1.1rem 0 0 0",
    padding: 0,
  },
  firstBox_01: {
    width: "20%",
    margin: "0rem",
    height: "fit-content",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
    display: "block",
  },

  toggleBox_01: {
    width: "16rem",
    margin: "0rem",
    height: "fit-content",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
    display: "block",
    zIndex: "100",
    position: "absolute",
    top: "58px",
    left: "17px",
  },

  secondBox_01: {
    width: "75%",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    margin: "-0.5rem 0 0 0",
    gap: "10px",
    justifyContent: "center",
  },
  navBar_01: {
    margin: "0rem",
  },
  avatar: {
    margin: " 8px auto",
    backgroundColor: "black",
  },
  notification: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "1rem",
    color: "#ed1c24",
    fontWeight: 600,
  },
  statusSelect: {
    minWidth: 120,
    marginLeft: "1rem",
  },
  paper: {
    margin: "1rem 0",
    padding: "1rem",
    position: "relative",
  },
  resolved: {
    background: "#e0ffe0",
  },
  pending: {
    background: "#fffbe0",
  },
  statusBtn: {
    position: "absolute",
    right: 16,
    top: 16,
  },
}));

function SupportRequests() {
  const classes = useStyles();
  const [requests, setRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [toggle, setToggle] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  

  // Fetch support requests
  useEffect(() => {
    axios.get("/api/v1/admin/support").then(res => {
      setRequests(res.data.requests);
    });
    // Fetch flagged notifications (simulate with localStorage for demo)
    const flagged = JSON.parse(localStorage.getItem("flaggedReports") || "[]");
    setNotifications(flagged);
  }, []);

  // Mark notification as resolved
  const handleStatusChange = (id, status) => {
    setRequests((prev) =>
      prev.map((req) =>
        req._id === id ? { ...req, status } : req
      )
    );
    // Optionally, send status update to backend here
  };

  // Filter requests by status
  const filteredRequests = requests.filter(req =>
    filter === "all" ? true : (req.status || "pending") === filter
  );

    // togle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  return (
    <div className={classes.updateUser1}>
      {/* Sidebar for desktop or toggled on mobile */}
      {(toggle || !isMobile) && (
        <div
          className={
            !toggle ? `${classes.firstBox_01}` : `${classes.toggleBox_01}`
          }
          style={isMobile ? { position: "fixed", zIndex: 2000, left: 0, top: 0, height: "100vh", width: "80vw",
            overflowY: "auto", // <-- add this
            background: "#fff",} : {}}
        >
          {/* Close button for mobile */}
            {isMobile && (
              <IconButton
                onClick={toggleHandler}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  zIndex: 3001,
                  background: "#fff",
                }}
              >
                <CloseIcon />
              </IconButton>
            )}
          <Sidebar />
        </div>
      )}
      <div className={classes.secondBox_01}>
        <div className={classes.navBar_01}>
          <Navbar toggleHandler={toggleHandler} />
        </div>
        <Box p={2}>
          <Typography variant="h5" gutterBottom>
            <NotificationsIcon /> Support Requests
          </Typography>
          {/* Notification area */}
          {notifications.length > 0 && (
            <div className={classes.notification}>
              <NotificationsIcon />
              {notifications.length} new abuse reports flagged by Review Team!
            </div>
          )}
          {/* Filter */}
          <div style={{ marginBottom: "1rem" }}>
            <Select
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className={classes.statusSelect}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="pending">
                <PendingActionsIcon fontSize="small" /> Pending
              </MenuItem>
              <MenuItem value="resolved">
                <AssignmentTurnedInIcon fontSize="small" /> Resolved
              </MenuItem>
            </Select>
          </div>
          {/* Requests */}
          {filteredRequests.map((req) => (
            <Paper
              key={req._id}
              className={`${classes.paper} ${req.status === "resolved" ? classes.resolved : classes.pending}`}
            >
              <Avatar className={classes.avatar}>
                {req.email ? req.email[0].toUpperCase() : "U"}
              </Avatar>
              <Typography><b>Issue:</b> {req.issue}</Typography>
              <Typography><b>Detail:</b> {req.detail}</Typography>
              <Typography><b>Language:</b> {req.language}</Typography>
              <Typography><b>Email:</b> {req.email}</Typography>
              <Typography><b>Message:</b> {req.message}</Typography>
              <Typography variant="caption">{new Date(req.createdAt).toLocaleString()}</Typography>
              <Select
                value={req.status || "pending"}
                onChange={e => handleStatusChange(req._id, e.target.value)}
                className={classes.statusSelect}
              >
                <MenuItem value="pending"><PendingActionsIcon fontSize="small" /> Pending</MenuItem>
                <MenuItem value="resolved"><AssignmentTurnedInIcon fontSize="small" /> Resolved</MenuItem>
              </Select>
            </Paper>
          ))}
        </Box>
      </div>
    </div>
  );
}

export default SupportRequests;