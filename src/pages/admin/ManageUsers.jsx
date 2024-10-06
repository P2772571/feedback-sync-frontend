import React from 'react'
import TitleBar from '../../components/dashboard/TitleBar'
import AdminActions from '../../components/admin/AdminActions'
import Users from '../../components/admin/Users'

function ManageUsers() {
  return (
    <>
      <TitleBar title="Manage Users" />
      <AdminActions />
      <Users />
    </>
  )
}

export default ManageUsers