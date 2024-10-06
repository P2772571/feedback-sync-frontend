import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Skeleton } from '@mui/material';

const styles = {
    cardItem: {
        backgroundColor: '#f5f5f5',
        borderRadius: 3,
        marginY: 2,
        padding: 2,
    },
    itemInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 12,
        color: '#4CAFF7'
    }
};

function CardItem({ title, progress, dueDate, loading }) {
    return (
        <Box sx={styles.cardItem}>
            {loading ? (
                <>
                    <Skeleton variant="text" width="80%" height={20} sx={{ marginBottom: 2 }} />
                    <Skeleton variant="text" width="50%" height={20} />
                </>
            ) : (
                <>
                    <Typography variant="body1">
                        <strong>Title:</strong> {title}
                    </Typography>
                    <Box sx={styles.itemInfo}>
                        <Typography variant="body2">Progress: {progress}%</Typography>
                        <Typography variant="body2">Due Date: {dueDate}</Typography>
                    </Box>
                </>
            )}
        </Box>
    );
}

CardItem.propTypes = {
    title: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    dueDate: PropTypes.string.isRequired,
    loading: PropTypes.bool, // Added loading prop
};

CardItem.defaultProps = {
    loading: false, // Default value for loading
};

export default CardItem;
