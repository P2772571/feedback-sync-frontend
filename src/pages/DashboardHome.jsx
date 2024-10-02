
import TitleBar from '../components/dashboard/TitleBar'
import { useLocation } from 'react-router-dom';
import Greeting from '../components/dashboard/Greeting';
import SectionCard from '../components/dashboard/SectionCard';
import RecentFeedbacks from '../components/dashboard/RecentFeedback';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import SingleInfoCard from '../components/dashboard/SingleInfoCard';


// Dummy Data 
const feedbacks = [
  { employeeName: 'Osama', feedbackPreview: 'You are a Great Developer ', date: '20-20-1020' },
  { employeeName: 'Saad', feedbackPreview: 'You are a Great Developer', date: '20-20-1020' },
  { employeeName: 'Rizwan', feedbackPreview: 'You are a Great Developer', date: '20-20-1020' },
  { employeeName: 'Osama', feedbackPreview: 'You are a Great Developer', date: '20-20-1020' },
  { employeeName: 'Saad', feedbackPreview: 'You are a Great Developer', date: '20-20-1020' },
  { employeeName: 'Rizwan', feedbackPreview: 'You are a Great Developer', date: '20-20-1020' },
  { employeeName: 'Osama', feedbackPreview: 'You are a Great Developer', date: '20-20-1020' },
  { employeeName: 'Saad', feedbackPreview: 'You are a Great Developer', date: '20-20-1020' },
  { employeeName: 'Rizwan', feedbackPreview: 'You are a Great Developer', date: '20-20-1020' },
  { employeeName: 'Osama', feedbackPreview: 'You are a Great Developer', date: '20-20-1020' },
  { employeeName: 'Saad', feedbackPreview: 'You are a Great Developer', date: '20-20-1020' },
  { employeeName: 'Rizwan', feedbackPreview: 'You are a Great Developer', date: '20-20-1020' }
];

const goals = [
  { title: 'Increase Sales by 15%', progress: 45, dueDate: '2024-10-15' },
  { title: 'Launch New Product Line', progress: 30, dueDate: '2024-12-01' },
  { title: 'Improve Customer Retention', progress: 60, dueDate: '2024-11-20' },
  { title: 'Reduce Operational Costs by 10%', progress: 25, dueDate: '2024-11-30' },
  { title: 'Enhance Employee Training Program', progress: 70, dueDate: '2024-10-05' }
];

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

  const role = user?.roles[0] || undefined



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
          <SectionCard title={'Active Goals'} items={goals} />
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
            <SingleInfoCard title="Assigned Goals" value={2} />
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