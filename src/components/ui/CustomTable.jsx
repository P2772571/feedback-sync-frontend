import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const styles = {
    tableContainer: {
      backgroundColor: '#F5F5F5',
        borderRadius: 5,
        boxShadow: 2,
        maxHeight: '350px',  // Limit the height of the table to 400px
        overflowY: 'auto',    // Enable vertical scrolling inside the table
    },
    tableHeader: {
        backgroundColor: '#E9E9E9',
        fontSize: 16,
        fontWeight: 'bold',
    },
    tableCellHeader: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
    tableRow: {
        cursor: 'pointer',  // Make rows clickable
        '&:hover': {
            backgroundColor: '#F0F0F0',  // Hover effect to indicate clickable rows
        }
    },

    tableCell: {
        textAlign: 'center',
        cursor: 'pointer',  // Make rows clickable
        
    },
};

function CustomTable({ columns, rows, onRowClick }) {
    return (
        <TableContainer component={Paper} sx={styles.tableContainer}>
            <Table>
                <TableHead sx={styles.tableHeader}>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableCell key={index} sx={styles.tableCellHeader}>
                                {column}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <TableRow sx={styles.tableRow}
                            key={rowIndex}
                            onClick={() => onRowClick(row)}  // Trigger the row click event
                        >
                            {row.map((cell, cellIndex) => (
                                <TableCell key={cellIndex} sx={styles.tableCell}>
                                    {cell}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

CustomTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    rows: PropTypes.arrayOf(PropTypes.array).isRequired,
    onRowClick: PropTypes.func.isRequired,  // Add onRowClick prop
};

export default CustomTable;
