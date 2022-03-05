import React, { useContext, useCallback } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppHeaderDropdown } from './header/index'
import { logo } from '../assets/brand/logo'
import { userContext } from '../../App'
import UserService from '../../services/UserService';
import useFetch from '../../hooks/useFetch';

const AppHeader = () => {
  const [dataContainer, setDataContainer] = useContext(userContext);
  const payloadData = jwt_decode(dataContainer.token);
  const navigate = useNavigate();

  const tokenExp = Math.floor(new Date().getTime() / 1000);

  const getUserData = useCallback(() => {
    setDataContainer({ ...dataContainer, id: payloadData.id, role: payloadData.role });
    return UserService.getUserById({ id: payloadData.id, role: payloadData.role });
  }, []);

  const { data } = useFetch(getUserData);

  if (payloadData.exp < tokenExp || !dataContainer.id || !dataContainer.role) {
    navigate('/login');
  }

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => setDataContainer({ ...dataContainer, sidebarShow: !dataContainer.sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink} activeClassName="active">
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Users</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">Settings</CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown imageURL={data?.imageURL} />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
