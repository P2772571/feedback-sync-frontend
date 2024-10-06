import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { Card, CardContent, Typography, Link } from "@mui/material";
import CustomTable from "../ui/CustomTable";
import CustomModal from "../ui/CustomModal";
import { fetchAllUserForAdmin } from "../../redux/userSlice";

const styles = {
    card: {
        display: 'flex',
        flexDirection: 'column',
        marginY: 2,
        borderRadius: 5,
    },
    cardContent: {
        paddingX: 4,
        paddingY: 4,
    },
    cardTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2,
        paddingX: 2,
    },
    skeletonRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginY: 1,
        width: '100%',
    },
}

const Users = () => {
    const [openViewAll, setOpenViewAll] = useState(false);
    const handleClickOpenViewAll = () => setOpenViewAll(true);
    const handleCloseViewAll = () => setOpenViewAll(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllUserForAdmin());
    }, [dispatch]);

    const { users, loading } = useSelector((state) => state.users);

    const skeletonRows = Array(6).fill().map((_, index) => (
        <Box key={index} sx={styles.skeletonRow}>
            <Skeleton variant="text" width="10%" height={30} />
            <Skeleton variant="text" width="20%" height={30} />
            <Skeleton variant="text" width="15%" height={30} />
            <Skeleton variant="text" width="10%" height={30} />
            <Skeleton variant="text" width="20%" height={30} />
        </Box>
    ));

    const rows = Array.isArray(users) ? users?.map((user) =>
        [

            user.userId,
            user.username,
            user.fullName,
            user.email,
            user.role
        ]

    ) : [];

    const columns = [
      "ID", "Username", "Full Name", "Email", "Role"
    ];


    return (
        <>
            <Card sx={styles.card}>
                <CardContent sx={styles.cardContent}>
                    <Box sx={styles.cardTitle}>
                        <Typography variant="h4" sx={{ color: '#4CAFF7' }}>
                            Users
                        </Typography>
                        <Link href="#" variant="body2" onClick={handleClickOpenViewAll}>
                            View all
                        </Link>
                    </Box>
                    {loading ? skeletonRows : (
                        <Box>
                            <CustomTable columns={columns} rows={rows} />
                        </Box>
                    )}
                </CardContent>
            </Card>

            <CustomModal
                open={openViewAll}
                onClose={handleCloseViewAll}
                title={`All Users`}
                showSearch={false}
            >
                {loading ? skeletonRows : (
                    <CustomTable columns={columns} rows={rows} />
                )}
            </CustomModal>

        </>
    );
}

export default Users;