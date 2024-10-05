import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Link, colors, Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import CustomTable from '../ui/CustomTable';
import CustomModal from '../ui/CustomModal';
import { useSelector } from 'react-redux';
import { useState } from 'react';

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
    skeletonRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginY: 1,
        width: '100%',
    }
};

function GivenFeedbacks({ feedbacks }) {
    const [openViewAll, setOpenViewAll] = useState(false);  // State for "View all" modal
    const [openFeedbackDetail, setOpenFeedbackDetail] = useState(false);  // State for feedback detail modal
    const [selectedFeedback, setSelectedFeedback] = useState(null);  // Store clicked feedback

    const feedbackLoading = useSelector((state) => state.feedbacks.loadingFeedbacks);  // Fetch loading state for feedbacks

    const handleClickOpenViewAll = () => setOpenViewAll(true);  
    const handleCloseViewAll = () => setOpenViewAll(false); 

    const handleRowClick = (feedbackRow) => {
        setSelectedFeedback(feedbackRow);  
        setOpenFeedbackDetail(true);  
    };

    const handleCloseFeedbackDetail = () => {
        setOpenFeedbackDetail(false); 
    };

    
    const columns = ['SR', 'Employee Name', 'Feedback Preview', 'Date'];
    const rows = Array.isArray(feedbacks)
        ? feedbacks?.map((feedback, index) => [
            index + 1,
            feedback?.receiverName,
            feedback?.content.length > 15
                ? `${feedback?.content.substring(0, 15)}...`  // Truncate feedback preview to 15 characters
                : feedback?.content,
            feedback?.createdAt
        ])
        : [];  // If feedbacks is not an array, fallback to an empty array

    // Skeleton rows to display during loading
    const skeletonRows = Array(3).fill().map((_, index) => (
        <Box key={index} sx={styles.skeletonRow}>
            <Skeleton variant="text" width="10%" height={30} />
            <Skeleton variant="text" width="30%" height={30} />
            <Skeleton variant="text" width="40%" height={30} />
            <Skeleton variant="text" width="15%" height={30} />
        </Box>
    ));

    return (
        <>
            <Card sx={styles.card}>
                <CardContent sx={styles.cardContent}>
                    <Box sx={styles.cardTitle}>
                        <Typography sx={{color: '#4CAFF7'}} variant="h4">Given Feedbacks</Typography>
                        <Link href="#" variant="body2" onClick={handleClickOpenViewAll}>
                            View all
                        </Link>
                    </Box>

                    {feedbackLoading ? (
                        <Box>
                            {skeletonRows}
                        </Box>
                    ) : (feedbacks?.length === 0 || feedbacks == null) ? (
                        <Typography variant='body2' sx={{
                            textAlign:'center',
                            padding:4,
                            color: colors.red[400]
                        }}  > No Feedback given till now. </Typography>
                    ) : (
                        <CustomTable columns={columns} rows={rows.slice(0, 6)} onRowClick={handleRowClick} /> 
                    )}

                </CardContent>
            </Card>

            {/* Modal for "View all" */}
            <CustomModal
                open={openViewAll}  // Keep this modal open all the time
                onClose={handleCloseViewAll}
                title="All Given Feedbacks"
                showSearch={false}  // Enable search in the "View all" modal
            >
                {feedbackLoading ? (
                    <Box>
                        {skeletonRows}
                    </Box>
                ) : feedbacks?.length === 0 ? (
                    <Typography variant='body2' sx={{
                        textAlign:'center',
                        padding:4,
                        color: colors.red[400]
                    }}  > No Feedback given till now. </Typography>
                ) : (
                    <CustomTable columns={columns} rows={rows} onRowClick={handleRowClick} /> 
                )}
            </CustomModal>

            {/* Modal for feedback detail when a row is clicked */}
            <CustomModal
                open={openFeedbackDetail}  // Open detail modal independently of the "View All" modal
                onClose={handleCloseFeedbackDetail}
                title="Feedback Details"
                showSearch={false}  // Disable search in the row click modal
            >
                {feedbackLoading ? (
                    <Box sx={{ padding: 2 }}>
                        <Skeleton variant="text" width="80%" height={30} />
                        <Skeleton variant="text" width="100%" height={80} sx={{ marginY: 2 }} />
                        <Skeleton variant="text" width="40%" height={30} />
                    </Box>
                ) : selectedFeedback ? (
                    <Box sx={{padding:2, gap:2}} >
                        <Typography variant="body1"><strong>Name:</strong> {selectedFeedback[1]}</Typography>
                        <Typography
                            variant="body1"
                            sx={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}  // Enable text wrapping for feedback
                        >
                            <strong>Feedback:</strong> {feedbacks[selectedFeedback[0] - 1].content} {/* Display full feedback */}
                        </Typography>
                        <Typography variant="body1"><strong>Date:</strong> {selectedFeedback[3]}</Typography>
                    </Box>
                ) : (
                    <Typography variant="body2">No feedback selected.</Typography>
                )}
            </CustomModal>
        </>
    );
}

GivenFeedbacks.propTypes = {
    feedbacks: PropTypes.arrayOf(PropTypes.shape({
        receiverName: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
    })).isRequired,
};

// Set default props to prevent errors when no feedback is passed
GivenFeedbacks.defaultProps = {
    feedbacks: [],
};

export default GivenFeedbacks;
