
import TitleBar from '../components/dashboard/TitleBar'
import { useLocation } from 'react-router-dom';
import Greeting from '../components/dashboard/Greeting';
import SectionCard from '../components/dashboard/SectionCard';
import RecentFeedbacks from '../components/dashboard/RecentFeedback';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import SingleInfoCard from '../components/dashboard/SingleInfoCard';

const pips = [
  { title: 'Improve Time Management', progress: 20, dueDate: '2024-09-30' },
  { title: 'Reduce Coding Errors by 25%', progress: 50, dueDate: '2024-10-10' },
  { title: 'Increase Team Collaboration', progress: 35, dueDate: '2024-10-20' },
  { title: 'Enhance Documentation Practices', progress: 40, dueDate: '2024-10-15' },
  { title: 'Meet Project Deadlines Consistently', progress: 65, dueDate: '2024-11-01' }
];



function DashboardHome() {
  const location = useLocation()
  const title = location.state?.title || "No title is Provided"
  const feedbacks = useSelector((state) => state.feedbacks.feedbacks)
  const user = useSelector((state) => state.auth.user)
  const users = useSelector((state) => state.users.users)
  const managerAssignedGoals = useSelector((state) => state.goals.managerAssignedGoals);
  const role = user?.roles[0] || undefined
  const userGoals = useSelector((state) => state.goals.userGoals)

  return (
    <>
      <TitleBar title={title} />

      <Greeting title={"Osama"} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '10px'
        }}

      >
        {role === "EMPLOYEE" ? (
        <>
          <Box sx={{ flex: 1 }}>
          <SectionCard title={'Active Goals'} items={userGoals} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <SectionCard title={'Active Pips'} items={pips} />
        </Box>
        </>
        ) : (
          <Box  sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent:'space-between',
            gap: '10px',
            flex: 1,
          }} >
            <SingleInfoCard title="Employees" value={users.length}  />
            <SingleInfoCard title="Recieved Feedbacks" value={feedbacks?.received?.length} />
            <SingleInfoCard title="Given Feedbacks" value={feedbacks?.given?.length} />
            <SingleInfoCard title="Assigned Goals" value={managerAssignedGoals?.length} />
            <SingleInfoCard title="Assigned PIPs" value={2} />


          </Box>
        )}


      </Box>

      {/* Recent Assignned Goals */}


      <RecentFeedbacks feedbacks={feedbacks?.received} />
    </>
  )
}

export default DashboardHome