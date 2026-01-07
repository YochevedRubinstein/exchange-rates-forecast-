import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper } from '@mui/material';
import {IForecastTableRow  } from '../../types/forecastResponse';

const ForecastMatrix: React.FC<IForecastTableRow[]> = ({data}) => {
  
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Month</TableCell>
            <TableCell>Actual</TableCell>
            <TableCell>Forecast</TableCell>
            <TableCell>Delta</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.month}</TableCell>
              <TableCell>{row.actual}</TableCell>
              <TableCell>{row.forecast ?? 'N/A'}</TableCell>
              <TableCell>{row.delta ?? 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ForecastMatrix;
