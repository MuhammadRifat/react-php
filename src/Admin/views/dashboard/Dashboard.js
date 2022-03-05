import React, { lazy, useContext } from 'react'
import { userContext } from '../../../App';

const Dashboard = () => {
  const [dataContainer] = useContext(userContext);

  return (
    <>
      <h3>Dashboard</h3>
    </>
  )
}

export default Dashboard
