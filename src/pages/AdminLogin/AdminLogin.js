import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { userContext } from '../../App'
import LoginService from '../../services/LoginService'

const AdminLogin = () => {
    const [dataContainer, setDataContainer] = useContext(userContext);
    const [loginData, setLoginData] = useState({});
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // take input data
    const handleBlur = (e) => {
        let value = e.target.value;
        const data = { ...loginData };
        data[e.target.name] = value;

        setLoginData(data);
    }

    // handle login
    const handleSubmit = (e) => {
        e.preventDefault();

        const newData = { ...loginData, role: 'admin' };
        LoginService.adminLogin(newData)
            .then(response => {
                if (response.status) {
                    setDataContainer({ ...dataContainer, token: response.token });
                    localStorage.setItem("token", response.token);
                    navigate('/dashboard');
                } else {
                    setError(response.error);
                }
            })
    }

    return (
        <div className="bg-light d-flex flex-row align-items-center" style={{ minHeight: '80vh' }}>
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <span className="text-danger">{error}</span>
                                    <CForm onSubmit={handleSubmit}>
                                        <h1>Login</h1>
                                        <p className="text-medium-emphasis">Sign In to your account</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput placeholder="Username" name="username" id="username" onBlur={handleBlur} autoComplete="username" />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                name="password"
                                                id="password"
                                                onBlur={handleBlur}
                                                placeholder="Password"
                                                autoComplete="current-password"
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton color="primary" type="submit" className="px-4">
                                                    Login
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6} className="text-right">
                                                <CButton color="link" className="px-0">
                                                    Forgot password?
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white bg-primary py-5">
                                <CCardBody className="text-center">
                                    <div>
                                        <h2>Sign up</h2>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                            tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                        <Link to="/registration">
                                            <CButton color="primary" className="mt-3" active tabIndex={-1}>
                                                Register Now!
                                            </CButton>
                                        </Link>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default AdminLogin;
