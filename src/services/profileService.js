import axiosInstance from "../config/axiosConfig";



// -------------------- Create Profile API Call --------------------
export const createProfileAPI = async (profileRequest) => {
    const response = await axiosInstance.post('api/profile', profileRequest);
    return response.data;  // Return the response, which includes user data and token
};

// -------------------- Get Profile API Call --------------------
export const getProfileAPI = async () => {
    const response = await axiosInstance.get('api/profile');
    return response.data;  // Return the response, which includes user data and token
};

// -------------------- Update Profile API Call --------------------
export const updateProfileAPI = async (profileRequest) => {
    const response = await axiosInstance.put('api/profile', profileRequest);
    return response.data;  // Return the response, which includes user data and token
};

// -------------------- Delete Profile API Call --------------------
export const deleteProfileAPI = async () => {
    const response = await axiosInstance.delete('api/profile');
    return response.data;  // Return the response, which includes user
}

// -------------------- Get Profile API Call --------------------
export const getProfileByIdAPI = async (id) => {
    const response = await axiosInstance.get(`api/profile/${id}`);
    return response.data;  // Return the response, which includes user data and token
};  // Service for getting a profile by ID



