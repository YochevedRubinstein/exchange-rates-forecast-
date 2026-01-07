import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Paper } from '@mui/material';

interface DeltaMatrixProps {
  data: number[][];
}

const DeltaMatrix: React.FC<DeltaMatrixProps> = ({ data }) => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: '100%', marginBottom: 3 }}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '18px', backgroundColor: '#2196f3', color: 'white' }}>Delta Values</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              {row.map((cell, j) => (
                <TableCell
                  key={j}
                  sx={{
                    backgroundColor: j % 2 === 0 ? '#e3f2fd' : '#ffffff',
                    fontSize: '16px',
                    color: cell < 0 ? 'red' : 'green',
                  }}
                >
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeltaMatrix;
