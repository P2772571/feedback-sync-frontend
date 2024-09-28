
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Link} from '@mui/material';
import { Box } from '@mui/system';
import CustomTable from '../ui/CustomTable';



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
        paddingX: 2
    },
    tableContainer: {
        borderRadius: 5,
        boxShadow: 2,
    },
    tableHeader:{
        backgroundColor:'#E9E9E9',
        borderRadius: 5,
        fontSize: 16,
        fontWeight: 'bold'
    }
}


function RecentFeedbacks({ feedbacks }) {
    const columns = ['SR', 'Employee Name', 'Feedback Preview', 'Date'];
    const rows = feedbacks.map((feedback, index) => [
        index + 1,
        feedback.employeeName,
        feedback.feedbackPreview,
        feedback.date
    ]);

    return (
        <Card sx={styles.card} >
            <CardContent sx={styles.cardContent} >
                <Box sx={styles.cardTitle} >
                    <Typography variant="h4">Recent Feedbacks</Typography>
                    <Link href="#" variant="body2">
                        View all
                    </Link>
                </Box>

                <CustomTable columns={columns} rows={rows} /> {/* Use the reusable table */}
            </CardContent>
        </Card>
    );
}
RecentFeedbacks.propTypes = {
    feedbacks: PropTypes.arrayOf(PropTypes.shape({
        employeeName: PropTypes.string.isRequired,
        feedbackPreview: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
    })).isRequired,
};

export default RecentFeedbacks;
