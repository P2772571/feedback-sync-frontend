import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import CustomButton from '../ui/CustomButton';
import CustomModal from '../ui/CustomModal';

// Styles
const styles = {
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 2,
    mt: 2,
  },
  formControl: {
    mt: 3,
    minWidth: 200,
  },
  textField: {
    mt: 2,
    minWidth: '100%',
  },
};

const FeedbackActions = ({users}) => {
  const [openRequestModal, setOpenRequestModal] = useState(false);  // State to manage request feedback modal visibility
  const [openGiveModal, setOpenGiveModal] = useState(false);  // State to manage give feedback modal visibility
  const [selectedUser, setSelectedUser] = useState('');  // State for the selected user
  const [feedbackContent, setFeedbackContent] = useState('');  // State for the feedback content
  const [isSubmitting, setIsSubmitting] = useState(false);  // State for managing submission    
  
  // Handlers for buttons
  const handleGiveFeedback = () => {
    setOpenGiveModal(true);  // Open the modal for "Give Feedback"
  };

  const handleRequestFeedback = () => {
    setOpenRequestModal(true);  // Open the modal for "Request Feedback"
  };

  const handleCloseModal = () => {
    setOpenRequestModal(false);  // Close "Request Feedback" modal
    setOpenGiveModal(false);  // Close "Give Feedback" modal
    setIsSubmitting(false);  // Reset submitting state when modal closes
  };

  const handleUserChange = (event) => {
    console.log(event.target);
    setSelectedUser(event.target.value);  // Update selected user
  };

  const handleFeedbackChange = (event) => {
    setFeedbackContent(event.target.value);  // Update feedback content
  };

  const handleSubmitFeedback = () => {
    setIsSubmitting(true);  // Set submission loading state
    setTimeout(() => {
      console.log('Feedback submitted:', selectedUser, feedbackContent);
      handleCloseModal();
    }, 2000); // Simulate API call
  };

  const handleSubmitRequest = () => {
    setIsSubmitting(true);  // Set submission loading state
    setTimeout(() => {
      console.log('Feedback request submitted for:', selectedUser);
      handleCloseModal();
    }, 2000); // Simulate API call
  };

  return (
    <>
      {/* Feedback Action Buttons */}
      <Box sx={styles.buttons}>
        <CustomButton
          onClick={handleGiveFeedback}
          variant="contained"
          color="primary"
        >
          Give Feedback
        </CustomButton>
        <CustomButton
          onClick={handleRequestFeedback}
          variant="contained"
          color="secondary"
        >
          Request Feedback
        </CustomButton>
      </Box>

      {/* Modal for Request Feedback */}
      <CustomModal
        open={openRequestModal}
        onClose={handleCloseModal}
        title="Request Feedback"
        showSearch={false}
      >
        {/* Dropdown to select user */}
        <FormControl sx={styles.formControl} fullWidth>
          <InputLabel id="request-user-select-label">Select User</InputLabel>
          <Select
            labelId="request-user-select-label"
            value={selectedUser || ''}
            label="Select User"
            sx={{ borderRadius: 5 }}
            onChange={handleUserChange}
          >
            {users.map((user) => (
              <MenuItem key={user.userId} value={user.userId}>
                {user.fullName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* Submit Button with CustomButton */}
       <Box sx={{

            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,

       }}>
       <CustomButton
          onClick={handleSubmitRequest}
          variant="contained"
          color="secondary"
          isSubmitting={isSubmitting}
          disabled={!selectedUser || isSubmitting}
        >
          Submit Request
        </CustomButton>
       </Box>
      </CustomModal>

      {/* Modal for Give Feedback */}
      <CustomModal
        open={openGiveModal}
        onClose={handleCloseModal}
        title="Give Feedback"
        showSearch={false}
      >
        {/* Dropdown to select user */}
        <FormControl sx={styles.formControl} fullWidth>
          <InputLabel id="give-user-select-label">Select User</InputLabel>
          <Select
            labelId="give-user-select-label"
            value={selectedUser}
            label="Select User"
            onChange={handleUserChange}
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.fullName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Feedback Content Area */}
        <TextField
          sx={styles.textField}
          label="Feedback Content"
          multiline
          rows={4}
          variant="outlined"
          value={feedbackContent}
          onChange={handleFeedbackChange}
        />

        {/* Submit Button with CustomButton */}
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
        }} >
        <CustomButton
          onClick={handleSubmitFeedback}
          variant="contained"
          color="primary"
          isSubmitting={isSubmitting}
          disabled={!selectedUser || !feedbackContent || isSubmitting}
        >
          Submit Feedback
        </CustomButton>
        </Box>
      </CustomModal>
    </>
  );
};
FeedbackActions.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      fullName: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FeedbackActions;
