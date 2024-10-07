import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Link, IconButton, colors, Skeleton, Typography } from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomButton from '../ui/CustomButton';
import CustomModal from '../ui/CustomModal';
import CustomTable from '../ui/CustomTable';
import { useDispatch, useSelector } from 'react-redux';
import { createFeedback, createFeedbackRequest, fetchFeedbackRequestsReceived, updateFeedbackRequestThunk } from '../../redux/feedbackSlice';

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
  },
  skeletonRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginY: 1,
    width: '100%',
  },
};

const FeedbackActions = ({ users }) => {
  const user = useSelector((state) => state.auth.user);
  const [openRequestModal, setOpenRequestModal] = useState(false);  // State to manage request feedback modal visibility
  const [openGiveModal, setOpenGiveModal] = useState(false);  // State to manage give feedback modal visibility
  const [openFeedbackRequestsModal, setOpenFeedbackRequestsModal] = useState(false);  // State to manage feedback requests modal visibility
  const [selectedUser, setSelectedUser] = useState('');  // State for the selected user
  const [requestId, setRequestId] = useState('');  // State for the selected user
  const [feedbackContent, setFeedbackContent] = useState('');  // State for the feedback content
  const [isSubmitting, setIsSubmitting] = useState(false);  // State for managing submission
  const feedbackRequests = useSelector((state) => state.feedbacks.feedbackRequests);  // Fetch feedback requests from the Redux state
  const feedbackRequestsLoading = useSelector((state) => state.feedbacks.loadingFeedbackRequests);  // Fetch loading state for feedback requests
  const [openApproveFeedbackModal, setOpenApproveFeedbackModal] = useState(false);  // State to manage approve feedback modal visibility


  const dispatch = useDispatch();

  // Fetch feedback requests when the component is mounted
  useEffect(() => {
    dispatch(fetchFeedbackRequestsReceived(user.id));
  }, [dispatch, user.id]);

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
    setOpenApproveFeedbackModal(false);  // Close "Approve
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
    dispatch(createFeedback(body))
      .then(() => {
        console.log('Feedback submitted:', selectedUser);
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
    dispatch(createFeedbackRequest(body))
      .then(() => {
        console.log('Feedback request submitted:', selectedUser);
        handleCloseModal();
      })
      .catch((error) => {
        console.error('Error submitting feedback request:', error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleApproveSubmit = async () => {
    setIsSubmitting(true);  // Set submission loading state'
  
    const body = {
      receiverId: selectedUser,
      giverId: user.id,
      content: feedbackContent,
      isSharedWithManager: false,
    };
  
    try {
      // First, create the feedback
      await dispatch(createFeedback(body)).unwrap();
      console.log('Feedback submitted:', selectedUser);
  
      // Then, update and remove the feedback request
      await dispatch(updateFeedbackRequestThunk(requestId)).unwrap();
      console.log(`Feedback request updated and removed for requestId: ${requestId}`);
  
      // Close modal after success
      handleCloseModal();
    } catch (error) {
      console.error('Error during feedback approval:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  const handleApprove = (requestId, requesterId) => {
 

    console.log('Approve Feedback Request:', requestId);
    return () => {
      setOpenApproveFeedbackModal(true);
      setSelectedUser(requesterId);
      setRequestId(requestId);
    };

  };

  const getUserNameById = (userId) => {
    const user = users.find((user) => user.userId === userId);
    return user ? user.fullName : '';
  };


  // Skeleton rows for feedback requests
  const skeletonRows = Array(3).fill().map((_, index) => (
    <Box key={index} sx={styles.skeletonRow}>
      <Skeleton variant="text" width="10%" height={30} />
      <Skeleton variant="text" width="30%" height={30} />
      <Skeleton variant="text" width="40%" height={30} />
      <Skeleton variant="text" width="15%" height={30} />
    </Box>
  ));

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
          <Typography variant="body1" sx={{ color: colors.blue[500],  }}>
                Feedback Requests{' '}
                {feedbackRequestsLoading ?  (
                <Skeleton variant="text" width={20} height={20} />
                ):(
                <Typography variant="caption" sx={{ color: colors.red[400] }}>({feedbackRequests.length})</Typography>
                )}
                </Typography> 
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
        {feedbackRequestsLoading ? (
          <Box>
            {skeletonRows}
          </Box>
        ) : (
          <CustomTable columns={columns} rows={rows} />
        )}
      </CustomModal>

      {/* Modal for Approving Feedback */}
      <CustomModal open={openApproveFeedbackModal} onClose={handleCloseModal} title="Approve Feedback" showSearch={false}>
        <Typography variant="h6" gutterBottom>
          Giving feedback to: {getUserNameById(selectedUser)}
        </Typography>
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
            onClick={handleApproveSubmit}
            variant="contained"
            color="primary"
            isSubmitting={isSubmitting}
            disabled={!feedbackContent || isSubmitting}
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
      userId: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FeedbackActions;
