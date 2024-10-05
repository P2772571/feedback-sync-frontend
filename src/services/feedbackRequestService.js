import axiosInstance from "../config/axiosConfig";

// ---------------- Create Feedback Request ----------------
export const createFeedbackRequestAPI = async (feedbackRequest) => {
    const response = await axiosInstance.post("api/feedback-request", feedbackRequest);
    return response.data;

};

// ---------------- Get All Feedback Requests of User ----------------
export const getAllFeedbackRequestsReceivedAPI = async (userId) => {
    const response = await axiosInstance.get("api/feedback-request/user/"+userId+"/received");
    return response.data;
};

// ---------------- Get All Feedback Requests Sent by User ----------------
export const getAllFeedbackRequestsSentAPI = async (userId) => {
    const response = await axiosInstance.get("api/feedback-request/user/"+userId+"/sent");
    return response.data;
};

// ---------------- Update Feedback Request ----------------
export const updateFeedbackRequestAPI = async (id) => {
    const response = await axiosInstance.put(`api/feedback-request/${id}`);
    return response.data;
};


// ---------------- Delete Feedback Request ----------------
export const deleteFeedbackRequestAPI = async (id) => {
    const response = await axiosInstance.delete(`api/feedback-request/${id}`);
    return response.data;
};
