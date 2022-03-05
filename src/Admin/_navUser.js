import React, { useContext } from 'react'
import CIcon from '@coreui/icons-react'
import {
    cilBell,
    cilChartPie,
    cilCursor,
    cilDrop,
    cilSpeedometer,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _navUser = [
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
        component: CNavItem,
        name: 'Orders',
        to: '/dashboard/orders',
        icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'Home',
        to: '/',
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    },
]

export default _navUser
