import axiosInstance from "../config/axiosConfig";



// -------------------- Create Task API Call --------------------
export const createTaskAPI = async (taskRequest) => {
    const response = await axiosInstance.post('api/tasks', taskRequest);
    return response.data;  // Return the response, which includes user data and token
};

// // -------------------- Get Tasks API Call --------------------
// export const getProfileAPI = async (goalId) => {
//     const response = await axiosInstance.get('api/tasks');
//     return response.data;  // Return the response, which includes user data and token
// };

// -------------------- Update Task API Call --------------------
export const updateTaskAPI = async (taskId,taskRequest) => {
    const response = await axiosInstance.put('api/tasks/'+taskId, taskRequest);
    return response.data;  // Return the response, which includes user data and token
};

// -------------------- Delete Profile API Call --------------------
export const deleteTaskAPI = async (taskId) => {
    const response = await axiosInstance.delete('api/tasks/'+taskId);
    return response.data;  // Return the response, which includes user
}
