import React from 'react'
import TitleBar from '../components/dashboard/TitleBar'
import { useLocation } from 'react-router-dom'

function Goal() {
  const location = useLocation()
  const title = location.state?.title || 'No Title Provided'
  console.log(title);
  

  return (
    <>
      <TitleBar title={title} />
   </>
  )
}

export default Goal