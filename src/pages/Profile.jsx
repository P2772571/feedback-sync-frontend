
import { useLocation } from 'react-router-dom'
import TitleBar from '../components/dashboard/TitleBar'
import PersonalInformation from '../components/porfile/PersonalInformation'
import ChangePassword from '../components/porfile/ChangePassword'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'

function Profile() {


  const user = useSelector((state) => state.auth.user)
  const profile = useSelector(state => state.profile.profile)
  
  const location = useLocation()

  
  const title = location.state?.title || 'No Title Provided'

  return (
    <Box>
      <TitleBar title={title} />
      {/* Body of Profile */}
      <Box
        sx={
          {
            height: '87vh',
            display:'flex',
            flexDirection:'row',
          }
        }
      >
        <PersonalInformation user= {user} profile={profile} />
        <ChangePassword user={user}  />
      </Box>

    </Box>
  )
}

export default Profile