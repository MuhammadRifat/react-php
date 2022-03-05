import React, { Suspense, useContext } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'
import { userContext } from '../../App';
import jwt_decode from 'jwt-decode';
import OrdersDetails from '../../pages/UserDashboard/OrdersDetails';

const Dashboard = React.lazy(() => import("../views/dashboard/Dashboard"));
const Notifications = React.lazy(() => import("../views/notifications/Notifications"));
const AdminProducts = React.lazy(() => import("../views/AdminProducts/AdminProducts"));
const AddProduct = React.lazy(() => import("../views/AdminProducts/AddProduct"));
const Orders = React.lazy(() => import("../../pages/UserDashboard/Orders"));
const NotFound = React.lazy(() => import("../../pages/NotFound/NotFound"));

const AppContent = () => {
  const [dataContainer] = useContext(userContext);
  const payloadData = jwt_decode(dataContainer.token);
  const navigate = useNavigate();

  const tokenExp = Math.floor(new Date().getTime() / 1000);

  if (payloadData.exp < tokenExp) {
    navigate('/login');
  }

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={payloadData.role === 'admin' ? <AdminProducts /> : <NotFound />} />
          <Route path="/addProduct" element={payloadData.role === 'admin' ? <AddProduct /> : <NotFound />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order/:ordersId" element={<OrdersDetails />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
