import axiosInstance from "../config/axiosConfig";

// -------------------- Create Feedback Request ----------------
export const createFeedback = async (feedbackRequest) => {
    const response = await axiosInstance.post("api/feedback", feedbackRequest);
    return response.data;
};

// ---------------- Get All Feedbacks of User ----------------
export const getAllFeedbacksOfUser = async (id) => {
    const response = await axiosInstance.get(`api/feedback/user/${id}`);
    return response.data;
};

