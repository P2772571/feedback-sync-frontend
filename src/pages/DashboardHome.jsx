
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
  const pips = useSelector((state) => state.pips.pips)

  // Fetch Loading from Redux
  const usersLoading = useSelector((state) => state.users.loading)
  const feedbacksLoading = useSelector((state) => state.feedbacks.loadingFeedbacks)
  const goalsLoading = useSelector((state) => state.goals.loading)
  const pipsLoading = useSelector((state) => state.pips.loading)
  
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
          <SectionCard title={'Active Goals'} items={userGoals} loading={goalsLoading} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <SectionCard title={'Active Pips'} items={pips} loading ={pipsLoading} />
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
            <SingleInfoCard title="Employees" value={users?.length} loading={usersLoading}  />
            <SingleInfoCard title="Recieved Feedbacks" value={feedbacks?.received?.length} loading={feedbacks} />
            <SingleInfoCard title="Given Feedbacks" value={feedbacks?.given?.length} loading={feedbacks} />
            <SingleInfoCard title="Assigned Goals" value={managerAssignedGoals?.length} loading={goalsLoading} />
            <SingleInfoCard title="Assigned PIPs" value={pips?.length} loading={pipsLoading} />
          </Box>
        )}
      </Box>

      {/* Recent Assignned Goals */}
      <RecentFeedbacks feedbacks={feedbacks?.received} loading={feedbacksLoading} />
    </>
  )
}

export default DashboardHome