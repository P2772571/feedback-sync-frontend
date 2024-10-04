import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Link } from '@mui/material';
import { Box } from '@mui/system';
import CustomTable from '../ui/CustomTable';
import { useState } from 'react';
import CustomModal from '../ui/CustomModal';

// Styles
const styles = {
    card: {
        display: 'flex',
        flexDirection: 'column',
        marginY: 2,
        borderRadius: 5,
    },
    cardContent: {
        paddingX: 4,
        paddingY: 4,
    },
    cardTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
        paddingX: 2,
    },
    tableContainer: {
        borderRadius: 5,
        boxShadow: 2,
    },
    tableHeader: {
        backgroundColor: '#E9E9E9',
        borderRadius: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
};

function Goals({ title, columns, rows }) {
    const [openViewAll, setOpenViewAll] = useState(false); // State for "View all" modal

    const handleClickOpenViewAll = () => setOpenViewAll(true); // Open "View all" modal
    const handleCloseViewAll = () => setOpenViewAll(false); // Close "View all" modal

    return (
        <>
            <Card sx={styles.card}>
                <CardContent sx={styles.cardContent}>
                    <Box sx={styles.cardTitle}>
                        <Typography  variant="h4" sx={{color: '#4CAFF7'}} >{title}  </Typography>
                        <Link href="#" variant="body2" onClick={handleClickOpenViewAll}>
                            View all
                        </Link>
                    </Box>

                    <CustomTable columns={columns} rows={rows.slice(0, 6)} /> {/* Display first 6 rows */}
                </CardContent>
            </Card>

            {/* Modal for "View all" */}
            <CustomModal
                open={openViewAll}
                onClose={handleCloseViewAll}
                title="All Assigned Goals"
                showSearch={false}
            >
                <CustomTable columns={columns} rows={rows} />  {/* Display all goals in the modal */}
            </CustomModal>
        </>
    );
}

Goals.propTypes = {
    title: PropTypes.string.isRequired, // Title of the table section
    columns: PropTypes.arrayOf(PropTypes.string).isRequired, // Column headers
    rows: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node])) // Each row can have text or JSX (like action buttons)
    ).isRequired,
};

// Default props in case no rows are passed
Goals.defaultProps = {
    rows: [],
};

export default Goals;
