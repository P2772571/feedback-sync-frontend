
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const styles = {
    tableContainer: {
      backgroundColor: '#F5F5F5',
        borderRadius: 5,
        boxShadow: 2,
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
    tableCellRow:{
        textAlign: 'center',

    }

};

function CustomTable({ columns, rows }) {
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
                        <TableRow key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <TableCell key={cellIndex} sx={styles.tableCellRow}>
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
};

export default CustomTable;
