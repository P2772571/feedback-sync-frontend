import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardContent, Typography, Link } from '@mui/material';
import CardItem from '../ui/CustomCardItem';
import CustomModal from '../ui/CustomModal';

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
    }
};

function SectionCard({ title, items, role }) {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return (
        <>
            {/* Main Card */}
            <Card sx={styles.card}>
                <CardContent sx={styles.cardContent}>
                    <Box sx={styles.cardTitle}>
                        <Typography variant="h4">{title}</Typography>
                        {/* <Link href="#" variant="body2" onClick={handleOpenModal}>
                            View all
                        </Link> */}
                    </Box>

                    {/* Display a few items in the card */}
                    {items.slice(0, 2).map((item, index) => (
                        <CardItem
                            key={index}
                            title={item.title}
                            progress={item.progress}
                            dueDate={item.dueDate}
                        />
                    ))}
                </CardContent>
            </Card>

            {/* Use CustomModal directly to display all items */}
            <CustomModal
                open={openModal}
                onClose={handleCloseModal}
                title={`All ${title}`}
            >
                {/* Render all items in the modal */}
                {items.map((item, index) => (
                    <CardItem
                        key={index}
                        title={item.title}
                        progress={item.progress}
                        dueDate={item.dueDate}
                    />
                ))}
            </CustomModal>
        </>
    );
}

SectionCard.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        progress: PropTypes.number.isRequired,
        dueDate: PropTypes.string.isRequired,
    })).isRequired,
    role:PropTypes.string.isRequired,
};

export default SectionCard;
