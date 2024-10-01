import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

const styles = {
    cardItem: {
        backgroundColor: '#f5f5f5',
        borderRadius: 3,
        marginY: 2,
        padding: 2
    },
    itemInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 12,
        color: '#4CAFF7'
    }
};

function CardItem({ title, progress, dueDate }) {
    return (
        <Box sx={styles.cardItem}>
            <Typography variant="body1">
                <strong>Title:</strong> {title}
            </Typography>
            <Box sx={styles.itemInfo}>
                <Typography variant="body2">Progress: {progress}%</Typography>
                <Typography variant="body2">Due Date: {dueDate}</Typography>
            </Box>
        </Box>
    );
}

CardItem.propTypes = {
    title: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    dueDate: PropTypes.string.isRequired,
};

export default CardItem;
