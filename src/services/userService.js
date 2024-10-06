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

export const getAllUserForAdminAPI = async () => {
    const response = await axiosInstance.get('api/users');
    console.log(response)
    return response.data;  
}

// -------------------- Register API Call --------------------
export const registerUserAPI = async (newUser) => {
    const response = await axiosInstance.post('api/users/create-user', newUser);
    console.log(response)
    return response;  // Return the response, which includes user data and token
    
  };
