import axiosInstance from "../config/axiosConfig";

// -------------------- Get All Users API Call --------------------
export const getAllUsersAPI = async () => {
    const response = await axiosInstance.get('api/users/all');
    return response.data;  
};

// -------------------- Get All Users Manager by a Manager API Call --------------------
export const getAllManagedUsers = async (id) => {
    const response = await axiosInstance.get('api/users/subordinates/'+id);
    return response.data;  
};