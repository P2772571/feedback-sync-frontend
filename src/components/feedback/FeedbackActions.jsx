import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Link, IconButton, colors } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { useState } from 'react';
import PropTypes from 'prop-types';
import CustomButton from '../ui/CustomButton';
import CustomModal from '../ui/CustomModal';
import CustomTable from '../ui/CustomTable';  // Assuming you already have a CustomTable component
import { useSelector } from 'react-redux';
import { createFeedbackRequest } from '../../services/feedbackRequestService';
import { createFeedback } from '../../services/feedbackService';
import { getAllFeedbackRequestsReceived } from '../../services/feedbackRequestService';
import { useEffect } from 'react';

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
  link:{
    textDecoration: 'none',
    paddingTop: 1,
    '&:hover': { textDecoration: 'underline',  }
  }
};  


const FeedbackActions = ({ users }) => { // Add feedbackRequests prop
  const user = useSelector((state) => state.auth.user);
  const [openRequestModal, setOpenRequestModal] = useState(false);  // State to manage request feedback modal visibility
  const [openGiveModal, setOpenGiveModal] = useState(false);  // State to manage give feedback modal visibility
  const [openFeedbackRequestsModal, setOpenFeedbackRequestsModal] = useState(false);  // State to manage feedback requests modal visibility
  const [selectedUser, setSelectedUser] = useState('');  // State for the selected user
  const [feedbackContent, setFeedbackContent] = useState('');  // State for the feedback content
  const [isSubmitting, setIsSubmitting] = useState(false);  // State for managing submission
  const [feedbackRequests, setFeedbackRequests] = useState([]);  // State for feedback requests
  const [loading , setLoading] = useState(false);

  // get feedback requests
  useEffect(() => {
    setLoading(true);
    getAllFeedbackRequestsReceived(user.id)
      .then((response) => {
        console.log('Feedback Requests:', response);
        setFeedbackRequests(response);
      })
      .catch((error) => {
        console.error('Error fetching feedback requests:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user.id]);





  // Handlers for buttons
  const handleGiveFeedback = () => {
    setOpenGiveModal(true);  // Open the modal for "Give Feedback"
  };

  const handleRequestFeedback = () => {
    setOpenRequestModal(true);  // Open the modal for "Request Feedback"
    setSelectedUser('');  // Reset selected user
  };

  const handleFeedbackRequests = () => {
    setOpenFeedbackRequestsModal(true);  // Open the modal for "Feedback Requests"
  };

  const handleCloseModal = () => {
    setOpenRequestModal(false);  // Close "Request Feedback" modal
    setOpenGiveModal(false);  // Close "Give Feedback" modal
    setOpenFeedbackRequestsModal(false);  // Close "Feedback Requests" modal
    setIsSubmitting(false);  // Reset submitting state when modal closes
    setSelectedUser('');  // Reset selected user when modal closes
    setFeedbackContent('');  // Reset feedback content when modal closes
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);  // Update selected user
  };

  const handleFeedbackChange = (event) => {
    setFeedbackContent(event.target.value);  // Update feedback content
  };

  const handleSubmitFeedback = () => {
    setIsSubmitting(true);  // Set submission loading state
    const body = {
      receiverId: selectedUser,
      giverId: user.id,
      content: feedbackContent,
      isSharedWithManager: false,
    };
    createFeedback(body)
      .then(() => {
        console.log('Feedback submitted:', body);
        handleCloseModal();
      })
      .catch((error) => {
        console.error('Error submitting feedback:', error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleSubmitRequest = () => {
    setIsSubmitting(true);  // Set submission loading state
    const body = {
      requesteeId: selectedUser,
      requesterId: user.id,
    };
    createFeedbackRequest(body)
      .then(() => {
        console.log('Feedback Request submitted:', selectedUser);
        handleCloseModal();
      })
      .catch((error) => {
        console.error('Error submitting feedback request:', error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleApprove = (requestId, requesterId) => {

    console.log(`Approving request with id: ${requestId} and requesterId: ${requesterId}`);
    // 1. first set the selected user. 
    // 2. then open the give feedback modal
    // 3. then let the user give feedback
    // 4. then submit the feedback
    // 5. if sucess then update the feedback request status to approved at backend and append the feedback to the feedbacks array at redux store
    // 6. fetch the feedback requests again
    // 7. then set the feedback requests 
  
  };


  // Columns and rows for the Feedback Requests table
  const columns = ['SR', 'Message', 'Requester Name', 'Date', 'Action'];
  const rows = feedbackRequests.map((request, index) => [
    index + 1,  // SR
    request.message,  // Message
    request.requesteeName,  // Requester Name
    request.createdAt,  // Date
    <Box key={`actions-${request.requestId}`} sx={{ display: 'flex', gap: 1 }}>
      <IconButton key={`approve-${request.requestId}`} color="primary" size="small" aria-label="approve" onClick={handleApprove(request.requestId, request.requesterId)}>
        <CheckCircle  />
      </IconButton>
      <IconButton key={`reject-${request.requestId}`} size="small" aria-label="reject" sx={{
        color:colors.red[400],
      }}>
        <Cancel />
      </IconButton>
    </Box>,
  ]);

  return (
    <>
      {/* Feedback Action Buttons */}
      <Box sx={styles.buttons}>
        <CustomButton onClick={handleGiveFeedback} variant="contained" color="primary">
          Give Feedback
        </CustomButton>
        <CustomButton onClick={handleRequestFeedback} variant="contained" color="secondary">
          Request Feedback
        </CustomButton>
        <Link href="#" onClick={handleFeedbackRequests} variant="body2" sx={{ ...styles.buttons, ...styles.link}}>
          Feedback Requests (2) 
        </Link>
      </Box>

      {/* Modal for Request Feedback */}
      <CustomModal open={openRequestModal} onClose={handleCloseModal} title="Request Feedback" showSearch={false}>
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
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
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
      <CustomModal open={openGiveModal} onClose={handleCloseModal} title="Give Feedback" showSearch={false}>
        <FormControl sx={styles.formControl} fullWidth>
          <InputLabel id="give-user-select-label">Select User</InputLabel>
          <Select labelId="give-user-select-label" value={selectedUser} label="Select User" onChange={handleUserChange}>
            {users.map((user) => (
              <MenuItem key={user.userId} value={user.userId}>
                {user.fullName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          sx={styles.textField}
          label="Feedback Content"
          multiline
          rows={4}
          variant="outlined"
          value={feedbackContent}
          onChange={handleFeedbackChange}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
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

      {/* Modal for Feedback Requests */}
      <CustomModal open={openFeedbackRequestsModal} onClose={handleCloseModal} title="Feedback Requests" showSearch={false}>
        <CustomTable columns={columns} rows={rows} />
      </CustomModal>
    </>
  );
};

FeedbackActions.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
    })
  ).isRequired,
  feedbackRequests: PropTypes.arrayOf(
    PropTypes.shape({
      requesterName: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,  // Adding feedbackRequests as a required prop
};

export default FeedbackActions;
