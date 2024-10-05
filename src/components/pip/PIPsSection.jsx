import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Link, Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import CustomTable from '../ui/CustomTable';
import { useState } from 'react';
import CustomModal from '../ui/CustomModal';
import { useSelector } from 'react-redux';

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
    skeletonRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginY: 1,
        width: '100%',
    },
};

function Pips({ title, columns, rows }) {
    const [openViewAll, setOpenViewAll] = useState(false); // State for "View all" modal
    const loading = useSelector((state) => state.pips.loading); // Fetch loading state from Redux

    const handleClickOpenViewAll = () => setOpenViewAll(true); // Open "View all" modal
    const handleCloseViewAll = () => setOpenViewAll(false); // Close "View all" modal

    // Skeleton rows to display during loading
    const skeletonRows = Array(6).fill().map((_, index) => (
        <Box key={index} sx={styles.skeletonRow}>
            <Skeleton variant="text" width="10%" height={30} />
            <Skeleton variant="text" width="30%" height={30} />
            <Skeleton variant="text" width="20%" height={30} />
            <Skeleton variant="text" width="20%" height={30} />
        </Box>
    ));

    return (
        <>
            <Card sx={styles.card}>
                <CardContent sx={styles.cardContent}>
                    <Box sx={styles.cardTitle}>
                        <Typography variant="h4" sx={{ color: '#4CAFF7' }}>
                            {title}
                        </Typography>
                        <Link href="#" variant="body2" onClick={handleClickOpenViewAll}>
                            View all
                        </Link>
                    </Box>

                    {loading ? (
                        <Box>{skeletonRows}</Box> // Show skeleton rows when loading
                    ) : (
                        <CustomTable columns={columns} rows={rows.slice(0, 6)} /> // Display first 6 rows when data is available
                    )}
                </CardContent>
            </Card>

            {/* Modal for "View all" */}
            <CustomModal
                open={openViewAll}
                onClose={handleCloseViewAll}
                title={`All ${title}`}
                showSearch={false}
            >
                {loading ? (
                    <Box>{skeletonRows}</Box> // Show skeleton rows in the modal while loading
                ) : (
                    <CustomTable columns={columns} rows={rows} /> // Display all rows in the modal
                )}
            </CustomModal>
        </>
    );
}

Pips.propTypes = {
    title: PropTypes.string.isRequired, // Title of the table section
    columns: PropTypes.arrayOf(PropTypes.string).isRequired, // Column headers
    rows: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node])) // Each row can have text or JSX (like action buttons)
    ).isRequired,
};

// Default props in case no rows are passed
Pips.defaultProps = {
    rows: [],
};

export default Pips;
