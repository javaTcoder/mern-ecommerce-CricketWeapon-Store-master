import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Paper, Box, Avatar } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Siderbar";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles"
import CloseIcon from "@mui/icons-material/Close";


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
  }));

function AbusiveReports() {
  const classes = useStyles();
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
  const [toggle, setToggle] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  

  // toggle handler =>
  const toggleHandler = () => {
    console.log("toggle");
    setToggle(!toggle);
  };


  useEffect(() => {
    axios
      .get("/api/v1/admin/abusive-reports")
      .then(res => setReports(res.data.reports))
      .catch(err => {
        setError(
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch abusive reports"
        );
      });
  }, []);

  return (
    <div className={classes.updateUser1}>
      {/* Sidebar for desktop or toggled on mobile */}
      {(toggle || !isMobile) && (
        <div
          className={
            !toggle ? `${classes.firstBox_01}` : `${classes.toggleBox_01}`
          }
          style={isMobile ? { position: "fixed", zIndex: 2000, left: 0, top: 0, height: "100vh",width: "80vw",
            overflowY: "auto", // <-- add this
            background: "#fff", } : {}}
        >{/* Close button for mobile */}
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
        <div className={classes.navBar_01} style={{ display: "flex", alignItems: "center" }}>
          <Navbar toggleHandler={toggleHandler} />
        </div>
        <Box p={2}>
          <Typography variant="h5" gutterBottom>
            Abusive Reports
          </Typography>
          {error && (
            <Typography color="error" style={{ marginBottom: "1rem" }}>
              {error}
            </Typography>
          )}
          {reports.length === 0 && !error && (
            <Typography>No abusive reports found.</Typography>
          )}
          {reports.map((rep) => (
            <Paper key={rep._id} style={{ margin: "1rem 0", padding: "1rem" }}>
              <Avatar>{rep.reportedBy?.name?.[0]}</Avatar>
              <Typography>
                <b>Reported By:</b> {rep.reportedBy?.name} ({rep.reportedBy?.email})
              </Typography>
              <Typography><b>Reason:</b> {rep.reason}</Typography>
              <Typography><b>Comment:</b> {rep.comment}</Typography>
              <Typography variant="caption">
                {new Date(rep.createdAt).toLocaleString()}
              </Typography>
            </Paper>
          ))}
        </Box>
      </div>
    </div>
  );
}

export default AbusiveReports;