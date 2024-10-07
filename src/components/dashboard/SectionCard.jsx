import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, Typography, Skeleton } from '@mui/material';
import CardItem from '../ui/CustomCardItem';
import CustomModal from '../ui/CustomModal';
import { useSelector } from 'react-redux';

const styles = {
    card: {
        display: 'flex',
        flexDirection: 'column',
        marginY: 2,
        borderRadius: 5,
        minHeight: '300px'
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
    }
};

function SectionCard({ title, items, loading}) {
    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => setOpenModal(false)



    return (
        <>
            {/* Main Card */}
            <Card sx={styles.card}>
                <CardContent sx={styles.cardContent}>
                    <Box sx={styles.cardTitle}>
                        <Typography sx={{ color: '#4CAFF7' }} variant="h4">
                            {title}
                        </Typography>
                    </Box>

                    {/* Show Skeleton Loading if loading is true */}
                    {loading ? (
                        <>
                            <Skeleton variant="rectangular" width="100%" height={80} sx={{ borderRadius: 5, marginBottom: 2, }} />
                            <Skeleton variant="rectangular" width="100%" height={80} sx={{ borderRadius: 5 }} />
                        </>
                    ) : (
                        items?.slice(0, 2)?.map((item, index) => (
                            <CardItem
                                key={index}
                                title={item?.goalName || item?.title}
                                progress={item?.progress}
                                dueDate={item?.dueDate}
                            />
                        ))
                    )}
                </CardContent>
            </Card>

            {/* Use CustomModal directly to display all items */}
            <CustomModal
                open={openModal}
                onClose={handleCloseModal}
                title={`All ${title}`}
            >
                {/* Render all items in the modal */}
                {loading ? (
                    <>
                        <Skeleton variant="rectangular" width="100%" height={80} sx={{ borderRadius: 1, marginBottom: 2 }} />
                        <Skeleton variant="rectangular" width="100%" height={80} sx={{ borderRadius: 1, marginBottom: 2 }} />
                        <Skeleton variant="rectangular" width="100%" height={80} sx={{ borderRadius: 1 }} />
                    </>
                ) : (
                    items?.map((item, index) => (
                        <CardItem
                            key={index}
                            title={item?.goalName || item?.title}
                            progress={item?.progress}
                            dueDate={item?.dueDate}
                        />
                    ))
                )}
            </CustomModal>
        </>
    );
}

SectionCard.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        goalName: PropTypes.string,
        progress: PropTypes.number.isRequired,
        dueDate: PropTypes.string.isRequired,
    })).isRequired,
    loading: PropTypes.bool.isRequired, // Added the loading prop
};

export default SectionCard;
