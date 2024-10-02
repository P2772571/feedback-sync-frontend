
import TitleBar from '../components/dashboard/TitleBar'
import { useLocation } from 'react-router-dom'
import FeedbackActions from '../components/feedback/FeedbackActions'
import RecievedFeedbacks from '../components/feedback/RecievedFeedback'
import GivenFeedbacks from '../components/feedback/GivenFeedbacks'
import { useSelector } from 'react-redux'


function Feedback() {
  const location = useLocation()
  const title = location.state?.title || "No Title Provided"
  const feedbacks = useSelector((state) => state.feedbacks.feedbacks)

  const received = feedbacks?.received
  const given = feedbacks?.given

  const users = useSelector(state => state.users.users)


  return (
   <>
      <TitleBar title={title} />

      <FeedbackActions users={users} />
     <RecievedFeedbacks feedbacks={received}  />
     <GivenFeedbacks feedbacks={given} />

   </>
  )
}

export default Feedback