import axiosInstance from "../config/axiosConfig";

// -------------------- Create Feedback Request ----------------
export const createFeedbackAPI = async (feedbackRequest) => {
    const response = await axiosInstance.post("api/feedback", feedbackRequest);
    return response.data;
};

// ---------------- Get All Feedbacks of User ----------------
export const getAllFeedbacksOfUserAPI = async (id) => {
    const response = await axiosInstance.get(`api/feedback/user/${id}`);
    return response.data;
};

// ---------------- Update Feedback ----------------
export const updateFeedbackAPI = async (feedbackId, feedbackRequest) => {
    const response = await axiosInstance.put(`api/feedback/${feedbackId}`, feedbackRequest);
    return response.data;
};

