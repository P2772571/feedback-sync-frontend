import axios from "axios";
import axiosInstance from "../config/axiosConfig";

// -------------------- Create PiP API Call --------------------
export const createPipAPI = async (pipRequest) => {
    const response = await axiosInstance.post('api/pips', pipRequest);
    console.log(response)
    return response.data;  // Return the response, which includes user data and token
};


// ---------- Get All Pip Assigned By Manager to Employee ----------------------------
export const getAllPipsAssignedByManagerAPI = async (employeeId) => {
    const response = await axiosInstance.get('api/pips/employee/'+employeeId);
    return response.data

};
// ---------- Get All Pip of Manager ----------------------------
export const getAllPipsCreateByManagerAPI = async (managerId) => {
    
    const response = await axiosInstance.get('api/pips/manager/'+managerId );
    return response.data

};

// ---------- Get a Goal by It's ID ----------------------------
export const getPipByIdAPI = async (pipId) => {
    const response = await axiosInstance.get('api/pips/'+pipId);
    return response.data

};
// ---------------- Update a Goal ----------------------------------
export const  updatePipAPI = async (pipId, pipRequest) =>{
    const respose = await axiosInstance.put('api/pips/'+pipId , pipRequest)
    return respose.data
}

// ----------------- Delete PIP ---------------------------
export const deletePipAPI = async (pipId) =>{
    const response = await axiosInstance.delete('api/pips/'+pipId);
    console.log(response) 
    return response.data
}