import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button, Alert } from '@mui/material';

const generateMonthOptions = () => {
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  const options = [];
  const startDate = new Date(2023, 0, 1); 
  const currentDate = new Date(); 

  let month = startDate;
  while (month <= currentDate) {
    const monthString = `${months[month.getMonth()]} ${month.getFullYear()}`;
    options.push({
      value: month.getMonth(),
      label: monthString,
      year: month.getFullYear(),
      month: month.getMonth(),
    });
    month.setMonth(month.getMonth() + 1);
  }

  return options;
};

const formatDateToYYYYMM = (year: number, month: number) => {
  const formattedMonth = (month + 1).toString().padStart(2, '0'); 
  return `${year}-${formattedMonth}`;
};

interface ChooseMonthsRangeProps {
  onConfirm: (startMonth: string, endMonth: string) => void; 
  onCancel: () => void;
}

const ChooseMonthsRange: React.FC<ChooseMonthsRangeProps> = ({ onConfirm, onCancel }) => {
  const [startMonth, setStartMonth] = useState<{ value: number, label: string, year: number } | null>(null);
  const [endMonth, setEndMonth] = useState<{ value: number, label: string, year: number } | null>(null);
  const [error, setError] = useState<string>("");

  const monthOptions = generateMonthOptions(); 

  useEffect(() => {
    if (monthOptions.length > 0) {
      setStartMonth(monthOptions[0]); 
      setEndMonth(monthOptions[monthOptions.length - 1]); 
    }
  }, [monthOptions]);

  const handleStartMonthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedMonth = monthOptions.find((month) => month.value === event.target.value);
    setStartMonth(selectedMonth || null);
    validateSelection(selectedMonth, endMonth);
  };

  const handleEndMonthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedMonth = monthOptions.find((month) => month.value === event.target.value);
    setEndMonth(selectedMonth || null);
    validateSelection(startMonth, selectedMonth);
  };

  const validateSelection = (start: { value: number, year: number } | null, end: { value: number, year: number } | null) => {
    if (start && end) {
      if (start.year > end.year || (start.year === end.year && start.value > end.value)) {
        setError("Start month must be before end month");
      } else {
        setError("");
      }
    }
  };

  const handleConfirm = () => {
    if (startMonth && endMonth && !error) {
      const formattedStartMonth = formatDateToYYYYMM(startMonth.year, startMonth.value);
      const formattedEndMonth = formatDateToYYYYMM(endMonth.year, endMonth.value);
      onConfirm(formattedStartMonth, formattedEndMonth); 
    }
  };

  return (
    <div className="month-range-selector">
      <div>
        <TextField
          select
          label="Select Start Month"
          value={startMonth ? startMonth.value : ""}
          onChange={handleStartMonthChange}
          fullWidth
          error={!!error}
          helperText={error}
        >
          {monthOptions.map((month) => (
            <MenuItem key={month.value} value={month.value}>
              {month.label}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div>
        <TextField
          select
          label="Select End Month"
          value={endMonth ? endMonth.value : ""}
          onChange={handleEndMonthChange}
          fullWidth
          error={!!error}
          helperText={error}
        >
          {monthOptions.map((month) => (
            <MenuItem key={month.value} value={month.value}>
              {month.label}
            </MenuItem>
          ))}
        </TextField>
      </div>

      {error && <Alert severity="error">{error}</Alert>}

      <div>
        <p>Selected range: {startMonth?.label} to {endMonth?.label}</p>
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

export default ChooseMonthsRange;
