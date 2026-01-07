import React from "react";
import Button from "@mui/material/Button";

type ShowForecastButtonProps = {
  onClick: () => void;
};

const ShowForecastButton: React.FC<ShowForecastButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        backgroundColor: "#1976d2",
        padding: "8px 16px",
        borderRadius: "8px",
        fontWeight: 600,
        ":hover": {
          backgroundColor: "#1565c0",
        },
      }}
    >
        Show Forecast
    </Button>
  );
};

export default ShowForecastButton;
