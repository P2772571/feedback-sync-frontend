import axiosInstance from "../config/axiosConfig";

// -------------------- Create Goal API Call --------------------
export const createGoalAPI = async (goalRequest) => {
    const response = await axiosInstance.post('api/goals', goalRequest);
    console.log(response)
    return response.data;  // Return the response, which includes user data and token
};

// -------------------- Get All Goals of a User ----------------------------
export const getAllGoalOfUserAPI = async (employeeId) => {
    const response = await axiosInstance.get('api/goals/employee/'+employeeId);
    return response.data

};
// ---------- Get All Goals Assigned By Manager to Employee ----------------------------
export const getAllGoalsAssignedByManagerAPI = async (managerId) => {
    const response = await axiosInstance.get('api/goals/manager/'+managerId);
    return response.data

};
// ---------- Get All Assigned Goals of Employee ----------------------------
export const getAllAssignedGoalsToUserAPI = async (userId, managerId) => {
    
    const response = await axiosInstance.get('api/goals/employee/'+userId +'/manager/'+managerId);
    return response.data

};

// ---------- Get a Goal by It's ID ----------------------------
export const getGoalByIdAPI = async (goalId) => {
    const response = await axiosInstance.get('api/goals/'+goalId);
    return response.data

};
// ---------------- Update a Goal ----------------------------------
export const  updateGoalAPI = async (goalId, goalRequest) =>{
    const respose = await axiosInstance.put('api/goals/'+goalId , goalRequest)
    console.log(respose);
    
    return respose.data
}