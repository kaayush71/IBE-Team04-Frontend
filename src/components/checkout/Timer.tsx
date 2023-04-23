import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

const Timer = (props: Props) => {
  const KEY = "remainingTime";
  const navigate = useNavigate();

  const [remainingTime, setRemainingTime] = useState(600); // 10 minutes in seconds
  useEffect(() => {
    if (remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          const newTime = prevTime - 1;
          localStorage.setItem(KEY, newTime.toString()); // store remaining time in localStorage
          return newTime;
        });
      }, 1000);
      return () => clearInterval(interval);
    } else {
      navigate("/");
    }
  }, [remainingTime, navigate]);
  useEffect(() => {
    const storedTime = localStorage.getItem(KEY);
    if (storedTime) {
      setRemainingTime(parseInt(storedTime));
    }
  }, []);
  return (
    <Typography
      sx={{ backgroundColor: "#26266D", color: "#fff", padding: "0 1rem" }}
      fontWeight={700}
    >
      {"Remaining Time : "}
      {`${Math.floor(remainingTime / 60)}:${remainingTime % 60 < 10 ? "0" : ""}${
        remainingTime % 60
      }`}
    </Typography>
  );
};

export default Timer;
