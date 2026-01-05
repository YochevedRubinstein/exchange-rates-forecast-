import React, { useState } from 'react';
import { FormControl, Checkbox, ListItemText, Button, Grid, Typography } from '@mui/material';

interface MonthPickerProps {
  selectedMonths: number[];
  onMonthChange: (months: number[]) => void;
  onCancel: () => void;
}

const MonthPicker: React.FC<MonthPickerProps> = ({ selectedMonths, onMonthChange, onCancel }) => {
  const [tempSelectedMonths, setTempSelectedMonths] = useState<number[]>(selectedMonths);

  const monthsNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleMonthToggle = (month: number) => {
    const newSelectedMonths = tempSelectedMonths.includes(month)
      ? tempSelectedMonths.filter((m) => m !== month)
      : [...tempSelectedMonths, month];
    setTempSelectedMonths(newSelectedMonths);
  };

  const handleOkClick = () => {
    onMonthChange(tempSelectedMonths);
  };

  return (
    <FormControl fullWidth>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button onClick={handleOkClick} variant="contained" color="primary">OK</Button>
        <Button onClick={onCancel} variant="outlined" color="secondary">Cancel</Button>
      </div>
      <Typography variant="h6" style={{ marginTop: 16, marginBottom: 8 }}>Select Months:</Typography>
      <Grid container spacing={2} style={{ marginTop: 16 }}>
        {monthsNames.map((monthName, index) => (
          <Grid item xs={4} sm={3} md={2} lg={1} key={index}>
            <ListItemText>
              <Checkbox
                checked={tempSelectedMonths.includes(index + 1)}
                onChange={() => handleMonthToggle(index + 1)}
                color="primary"
              />
              {monthName}
            </ListItemText>
          </Grid>
        ))}
      </Grid>
    </FormControl>
  );
};

export default MonthPicker;
