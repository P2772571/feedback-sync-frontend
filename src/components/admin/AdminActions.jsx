import React, { useState } from 'react'
import { Box, TextField, MenuItem, CircularProgress } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import CustomButton from '../ui/CustomButton'
import CustomModal from '../ui/CustomModal'
import Signup from '../../pages/authentication/Register'
import { assignEmployee } from '../../redux/profileSlice'

// Styles
const styles = {
    actionButton: {
        display: 'flex',
        flexDirection: 'row-reverse',
        gap: 2
    },
    modalContent: {
        maxWidth: '500px',
        width: '100%',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 2,
        mt: 2,
    },
    selectField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 5,
            backgroundColor: '#E6E6E6',
        },
    },
}


const AdminActions = () => {
    const [openSignUpModal, setOpenSignUpModal] = useState(false)
    const [openAssignEmployeeModdal, setOpenAssignEmployeeModdal] = useState(false)
    const [selectedManager, setSelectedManager] = useState('')
    const [selectedEmployee, setSelectedEmployee] = useState('')
    const [loading, setLoading] = useState(false) // Loading state for Assign button

    // Get the User and Users
    const user = useSelector((state) => state.auth.user)
    const users = useSelector((state) => state.users.users)
    const loadingUsers = useSelector((state) => state.users.loading)

    const dispatch = useDispatch()

    // Filter Uses to get only employees
    const employees = users.filter(user => user.role === 'EMPLOYEE')
    // Filter Users to get only managers
    const managers = users.filter(user => user.role === 'MANAGER')

    console.log("Users:", users)

    const handleCloseModal = () => {
        setOpenSignUpModal(false)
    }

    const handleAssignSubmit = () => {
        if (selectedManager && selectedEmployee) {
            setLoading(true) // Show loader


            dispatch(assignEmployee({manager: selectedManager, employee: selectedEmployee})).then((result) => {
                console.log(result)
            }).catch((err) => {
                console.log(err)
            });

            setLoading(false) // Hide loader
            setOpenAssignEmployeeModdal(false) // Close the

        }
    }

    return (
        <Box>
            <Box sx={styles.actionButton}>
                <CustomButton
                    onClick={() => setOpenSignUpModal(true)}
                    variant="contained"
                    color="primary"
                >
                    Add User
                </CustomButton>

                <CustomButton
                    onClick={() => setOpenAssignEmployeeModdal(true)}
                    variant="contained"
                    color="primary"
                >
                    Assign Employees
                </CustomButton>
            </Box>

            {/** Sign Up Modal */}
            <CustomModal open={openSignUpModal} onClose={() => setOpenSignUpModal(false)} title='Sign Up' >
                <Signup closeModal={handleCloseModal} />
            </CustomModal>

            {/** Assign Employee Modal */}
            <CustomModal open={openAssignEmployeeModdal} onClose={() => setOpenAssignEmployeeModdal(false)} title='Assign Employee' >
                <Box sx={styles.modalContent}>
                    <TextField
                        label="Manager"
                        variant="outlined"
                        select
                        fullWidth
                        sx={styles.selectField}
                        value={selectedManager}
                        onChange={(e) => setSelectedManager(e.target.value)}
                    >
                        {managers.map((manager) => (
                            <MenuItem key={manager.userId} value={manager}>
                                {manager.fullName}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Employee"
                        variant="outlined"
                        select
                        fullWidth
                        sx={styles.selectField}
                        value={selectedEmployee}
                        onChange={(e) => setSelectedEmployee(e.target.value)}
                    >
                        {employees.map((employee) => (
                            <MenuItem key={employee.userId} value={employee}>
                                {employee.fullName}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Box sx={styles.buttons}>
                        <CustomButton
                            onClick={handleAssignSubmit}
                            variant="contained"
                            color="primary"
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? <CircularProgress size={24} /> : 'Assign'} {/* Show loader if loading */}
                        </CustomButton>
                    </Box>
                </Box>
            </CustomModal>
        </Box>
    )
}

export default AdminActions
