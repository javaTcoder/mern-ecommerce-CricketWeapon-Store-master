import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(2), // ✅ Works now
    backgroundColor: "black",
    color: "white",
  },
}));

const TestStyles = () => {
  const classes = useStyles();
  return <div className={classes.testBox}>✅ makeStyles is working!</div>;
};

export default TestStyles;
