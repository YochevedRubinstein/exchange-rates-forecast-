import React, { useState, useEffect } from 'react';
import { TextField, Button, Alert } from '@mui/material';

interface ChooseAvgRangeProps {
  onConfirm: (startValue: number, endValue: number) => void;
  onCancel: () => void;
}

const ChooseAvgRange: React.FC<ChooseAvgRangeProps> = ({ onConfirm, onCancel }) => {
  const [startValue, setStartValue] = useState<number>(0);
  const [endValue, setEndValue] = useState<number>(10);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    validateSelection();
  }, [startValue, endValue]);

  const handleStartValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 0 && value <= 10) {
      setStartValue(value);
    }
  };

  const handleEndValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value) && value >= 0 && value <= 10) {
      setEndValue(value);
    }
  };

  const validateSelection = () => {
    if (startValue > endValue) {
      setError("Start value must be less than or equal to end value");
    } else {
      setError("");
    }
  };

  const handleConfirm = () => {
    if (!error) {
      onConfirm(startValue, endValue);
    }
  };

  return (
    <div className="avg-range-selector">
      <div>
        <TextField
          label="Select Start Value"
          type="number"
          value={startValue}
          onChange={handleStartValueChange}
          fullWidth
          inputProps={{ step: 0.0001 }}  // Allowing decimal values up to 4 digits after the decimal
          error={!!error}
          helperText={error}
        />
      </div>

      <div style={{ marginTop: '10px' }}>
        <TextField
          label="Select End Value"
          type="number"
          value={endValue}
          onChange={handleEndValueChange}
          fullWidth
          inputProps={{ step: 0.0001 }}  // Allowing decimal values up to 4 digits after the decimal
          error={!!error}
          helperText={error}
        />
      </div>

      {error && <Alert severity="error">{error}</Alert>}

      <div style={{ marginTop: '20px' }}>
        <p>Selected range: {startValue} to {endValue}</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirm}
          disabled={!!error}
        >
          OK
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onCancel}
          style={{ marginLeft: '10px' }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ChooseAvgRange;
