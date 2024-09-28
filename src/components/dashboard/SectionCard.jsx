import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, Typography, Link } from '@mui/material';


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
        paddingX: 2
    },
    cardItem: {
        backgroundColor: '#f5f5f5',
        borderRadius: 3,
        marginY: 2,
        padding: 2
    
    },
    ItemInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 12,
        color: '#4CAFF7'
    }

}



function SectionCard({ title, items }) {
    return (
        <Card sx={styles.card}>
            <CardContent sx={styles.cardContent}>
                <Box sx={styles.cardTitle}>
                    <Typography variant="h4">{title}</Typography>
                    <Link href="#" variant="body2" sx={{}}>
                        View all
                    </Link>
                </Box>
                <Box  sx={styles.cardItem}>
                    <Typography variant="body1">
                        <strong>Title:</strong> Title One
                    </Typography>
                    <Box sx={styles.ItemInfo}>
                        <Typography variant="body2">Progress: 30%</Typography>
                        <Typography variant="body2">Due Date: Today</Typography>
                    </Box>
                </Box>
                <Box  sx={styles.cardItem}>
                    <Typography variant="body1">
                        <strong>Title:</strong> Title One
                    </Typography>
                    <Box sx={styles.ItemInfo}>
                        <Typography variant="body2">Progress: 30%</Typography>
                        <Typography variant="body2">Due Date: Today</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
SectionCard.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
};

export default SectionCard;

