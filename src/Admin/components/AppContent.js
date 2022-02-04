import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

const Dashboard = React.lazy(() => import("../views/dashboard/Dashboard"));
const Notifications = React.lazy(() => import("../views/notifications/Notifications"));

const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="notifications" element={<Notifications />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
