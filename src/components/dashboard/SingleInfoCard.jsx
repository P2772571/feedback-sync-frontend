import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material';
import { useSelector } from 'react-redux';

const styles = {
    card: {
        display: 'flex',
        flexDirection: 'column',
        marginY: 2,
        borderRadius: 5,
    },
    cardContent: {
        padding: 2,
    },
    cardTitle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

function SingleInfoCard({ title, value }) {
    const pipLoading = useSelector((state) => state.pips.loading); // Fetch pip loading state from Redux
    const goalLoading = useSelector((state) => state.goals.loading); // Fetch goal loading state from Redux
    const feedbackLoading = useSelector((state) => state.feedbacks.loading); // Fetch feedback loading state from Redux
    const userLoading = useSelector((state) => state.users.loading); // Fetch user loading state from Redux
    

    // Combine local and passed loading state if needed
    const isLoading = pipLoading || goalLoading || feedbackLoading || userLoading ;

    return (
        <Card sx={styles.card}>
            <CardContent sx={styles.cardContent}>
                <Box sx={styles.cardTitle}>
                    <Typography variant="h6">{title}</Typography>
                </Box>

                {isLoading ? (
                    <Box sx={styles.cardTitle}>
                        <Skeleton variant="rectangular" width={80} height={40} />
                    </Box>
                ) : (
                    <Typography variant="h6" sx={styles.cardTitle}>
                        {value || 0}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}

SingleInfoCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

SingleInfoCard.defaultProps = {
    loading: false, // Default value for loading prop
};

export default SingleInfoCard;
