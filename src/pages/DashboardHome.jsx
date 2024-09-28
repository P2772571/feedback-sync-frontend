
import TitleBar from '../components/dashboard/TitleBar'
import { useLocation } from 'react-router-dom';
import Greeting from '../components/dashboard/Greeting';
import SectionCard from '../components/dashboard/SectionCard';
import RecentFeedbacks from '../components/dashboard/RecentFeedback';
import { Box } from '@mui/material';


// Dummy Data 
const feedbacks = [
  { employeeName: 'Osama', feedbackPreview: 'You are a Great Developer', date: '20-20-1020' },
  { employeeName: 'Saad', feedbackPreview: 'You are a Great Developer', date: '20-20-1020' },
  { employeeName: 'Rizwan', feedbackPreview: 'You are a Great Developer', date: '20-20-1020' }
];



function DashboardHome() {
  const location = useLocation()
  const title = location.state?.title || "No title is Provided"
  console.log(location.state);
  
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
       {/* Section Cards */}
       <Box sx={{ flex: 1 }}>
          <SectionCard title={'Active Goals'} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <SectionCard title={'Active Pips'} />
        </Box>
      </Box>

      <RecentFeedbacks feedbacks={feedbacks} />
   </>
  )
}

export default DashboardHome