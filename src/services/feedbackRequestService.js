import axiosInstance from "../config/axiosConfig";

// ---------------- Create Feedback Request ----------------
export const createFeedbackRequest = async (feedbackRequest) => {
    const response = await axiosInstance.post("api/feedback-request", feedbackRequest);
    return response.data;

};

// ---------------- Get All Feedback Requests of User ----------------
export const getAllFeedbackRequestsReceived = async (userId) => {
    const response = await axiosInstance.get("api/feedback-request/user/"+userId+"/received");
    return response.data;
};

// ---------------- Delete Feedback Request ----------------
export const deleteFeedbackRequest = async (id) => {
    const response = await axiosInstance.delete(`api/feedback-request/${id}`);
    return response.data;
};
