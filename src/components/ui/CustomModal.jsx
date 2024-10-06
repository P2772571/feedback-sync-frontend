import { Dialog, DialogContent, DialogTitle, Typography, IconButton, Box, TextField, colors } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import the close icon
import PropTypes from 'prop-types';

// Styles
const styles = {
    globalModal: {
        '& .MuiDialog-paper': {
            borderRadius: 5,
            padding: 5,
            position: 'relative',
            width: 'auto', // Make the modal width dynamic
            maxWidth: 'none', // Prevent maxWidth limitation
        }
    },
    dialogTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: '16px',  // Ensure space for close button
    },
    closeButton: {
        color: colors.red[300],
    },
    dialogContent: {
        paddingX: 2,
        paddingY: 1,
    },
};

function CustomModal({ open, onClose, title, children, showSearch }) {
    return (
        <Dialog 
            open={open} 
            onClose={onClose} 
            sx={styles.globalModal} 
            PaperProps={{ style: { width: 'auto', maxWidth: 'none' } }} // Adjust width dynamically
        >
            <DialogTitle sx={styles.dialogTitle}>
                <Typography variant="h5">{title}</Typography>
                {/* Close button aligned with the title */}
                <IconButton onClick={onClose} sx={styles.closeButton}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent sx={styles.dialogContent}>
                {/* Optionally show a search bar */}
                {showSearch && (
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Search"
                        sx={{ marginBottom: 2 }}
                    />
                )}
                {/* Content passed to the modal */}
                {children}
            </DialogContent>
        </Dialog>
    );
}

CustomModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired, // Accept any content
    showSearch: PropTypes.bool, // Optionally show the search bar
};

CustomModal.defaultProps = {
    showSearch: false,
};

export default CustomModal;
