import React, { useState } from 'react';
import { Button, TextField, Grid, Box, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface FilterRangePickerProps {
  selectedRange: { start: Date | null; end: Date | null };
  onChooseRange: (range: { start: Date | null; end: Date | null }) => void;
  onCancel: () => void;
  onNumberRangeChange: (min: number | undefined, max: number | undefined) => void;
}

const FilterRangePicker: React.FC<FilterRangePickerProps> = ({
  selectedRange,
  onChooseRange,
  onCancel,
  onNumberRangeChange
}) => {
  const [tempSelectedRange, setTempSelectedRange] = useState<{ start: Date | null; end: Date | null }>(selectedRange);
  const [tempMinRate, setTempMinRate] = useState<number | undefined>(undefined);
  const [tempMaxRate, setTempMaxRate] = useState<number | undefined>(undefined);

  const handleRangeChange = (field: 'start' | 'end', date: Date | null) => {
    setTempSelectedRange((prev) => ({
      ...prev,
      [field]: date,
    }));
  };

  const handleMinRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setTempMinRate(value || undefined);
  };

  const handleMaxRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setTempMaxRate(value || undefined);
  };

  const handleOkClick = () => {
    if (tempSelectedRange.start && tempSelectedRange.end) {
      onChooseRange(tempSelectedRange);
    }
    if (tempMinRate !== undefined && tempMaxRate !== undefined) {
      onNumberRangeChange(tempMinRate, tempMaxRate);
    }
  };

  return (
    <Box>
      <Typography variant="h6">Select Date Range</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Start Date"
              value={tempSelectedRange.start}
              onChange={(newDate) => handleRangeChange('start', newDate)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="End Date"
              value={tempSelectedRange.end}
              onChange={(newDate) => handleRangeChange('end', newDate)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>

      <Typography variant="h6" marginTop={2}>Select Average Rate Range</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Minimum"
            value={tempMinRate || ''}
            onChange={handleMinRateChange}
            type="number"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Maximum"
            value={tempMaxRate || ''}
            onChange={handleMaxRateChange}
            type="number"
            fullWidth
          />
        </Grid>
      </Grid>

      <Box marginTop={2}>
        <Button onClick={handleOkClick} variant="contained">OK</Button>
        <Button onClick={onCancel} variant="outlined" style={{ marginLeft: '8px' }}>Cancel</Button>
      </Box>
    </Box>
  );
};

export default FilterRangePicker;
