import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilChartPie,
  cilDrop,
  cilSpeedometer,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _navAdmin = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard/',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Home',
  },
  {
    component: CNavItem,
    name: 'Home',
    to: '/',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Products',
    to: '/dashboard/products',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Manage Products',
        to: '/dashboard/products',
      },
      {
        component: CNavItem,
        name: 'Add Product',
        to: '/dashboard/addProduct',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
      component: CNavItem,
      name: 'Orders',
      to: '/dashboard/orders',
      icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Alert',
        to: '/dashboard/notifications',
      },
      {
        component: CNavItem,
        name: 'Badges',
        to: '/dashboard/notifications/badges',
      },
    ],
  },
]

export default _navAdmin
