
import React from 'react'
import TitleBar from '../components/dashboard/TitleBar'
import { useLocation } from 'react-router-dom'

function Feedback() {
  const location = useLocation()
  const title = location.state?.title || "No Title Provided"

  return (
   <>
      <TitleBar title={title} />
   </>
  )
}

export default Feedback