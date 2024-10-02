
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { Padding } from '@mui/icons-material';



const styles = {
    card: {
        display: 'flex',
        flexDirection: 'column',
        marginY: 2,
        borderRadius: 5,
    },
    cardContent: {
        padding:2   
    },
    cardTitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',


    }

};
function SingleInfoCard({ title, value }) {

    console.log(title, value)
    return (
        <Card sx={styles.card}>
            <CardContent sx={styles.cardContent}>
                <Box sx={styles.cardTitle}>
                    <Typography variant="h6">{title}</Typography>
                
                </Box>

                {/* Display a few items in the card */}
                <Typography variant="h6" sx={styles.cardTitle}>
                    {value}
                </Typography>
            </CardContent>
        </Card>
    )
}


SingleInfoCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
};

export default SingleInfoCard